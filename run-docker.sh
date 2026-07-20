#!/usr/bin/env bash
set -euo pipefail

IMAGE=llmutantkiller-artifact
ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
OUT="$ROOT/docker_output"
ENV_FILE="$ROOT/source-code/.env"
SUBJECT_LIST="$ROOT/subject_repositories.txt"

if [[ -f "$ENV_FILE" ]]; then
  while IFS='=' read -r key value; do
    [[ -z "${key//[[:space:]]/}" || "${key:0:1}" == "#" ]] && continue
    [[ "$key" =~ ^[A-Za-z_][A-Za-z0-9_]*$ ]] || continue
    value=${value%$'\r'}
    export "$key=$value"
  done < "$ENV_FILE"
else
  echo "[WARN] $ENV_FILE not found. Live LLM runs require API credentials."
fi

export OPENROUTER_LLM_API_ENDPOINT="${OPENROUTER_LLM_API_ENDPOINT:-https://openrouter.ai/api/v1/chat/completions}"
export OPENROUTER_ENABLE_AUTO_CACHE="${OPENROUTER_ENABLE_AUTO_CACHE:-true}"

if [[ -z "${OPENROUTER_LLM_AUTH_HEADERS:-}" && -n "${OPENROUTER_API_KEY:-}" ]]; then
  export OPENROUTER_LLM_AUTH_HEADERS="{\"Authorization\":\"Bearer ${OPENROUTER_API_KEY}\"}"
fi

mkdir -p \
  "$OUT/generated_tests" \
  "$OUT/llm-cache" \
  "$OUT/subject_repositories" \
  "$OUT/analysis_outputs"

if docker buildx version >/dev/null 2>&1; then
  docker buildx build --platform linux/amd64 -t "$IMAGE" "$ROOT" --load
else
  echo "[WARN] docker buildx not found; falling back to plain docker build."
  docker build -t "$IMAGE" "$ROOT"
fi

if docker run --help 2>&1 | grep -q -- '--platform'; then
  PLATFORM_OPT="--platform linux/amd64"
else
  PLATFORM_OPT=""
  echo "[WARN] Your Docker version does not support --platform; using host architecture."
fi

if [[ ! -f "$SUBJECT_LIST" ]]; then
  echo "[ERROR] Subject repository list not found: $SUBJECT_LIST" >&2
  exit 1
fi

echo "Preparing subject repositories listed in subject_repositories.txt..."
docker run --rm \
  $PLATFORM_OPT \
  --mount type=bind,source="$SUBJECT_LIST",target=/tmp/subject_repositories.txt,readonly \
  --mount type=bind,source="$OUT/subject_repositories",target=/usr/src/app/subject_repositories \
  "$IMAGE" \
  bash -c '
    set -euo pipefail
    while IFS= read -r repository || [[ -n "$repository" ]]; do
      repository=${repository%$'"'"'\r'"'"'}
      [[ -z "$repository" || "$repository" == \#* ]] && continue

      name=${repository##*/}
      name=${name%.git}
      destination="/usr/src/app/subject_repositories/$name"

      if [[ -d "$destination/.git" ]]; then
        echo "[SKIP] $name already exists."
      elif [[ -e "$destination" ]]; then
        echo "[ERROR] $destination exists but is not a Git repository." >&2
        exit 1
      else
        echo "[CLONE] $repository"
        git clone "$repository" "$destination"
      fi
    done < /tmp/subject_repositories.txt
  '

docker run --rm -it \
  $PLATFORM_OPT \
  -e OPENROUTER_LLM_API_ENDPOINT \
  -e OPENROUTER_LLM_AUTH_HEADERS \
  -e OPENROUTER_API_KEY \
  -e OPENROUTER_ENABLE_AUTO_CACHE \
  -e GITHUB_TOKEN \
  --mount type=bind,source="$OUT/generated_tests",target=/usr/src/app/source-code/generated_tests \
  --mount type=bind,source="$OUT/llm-cache",target=/usr/src/app/source-code/llm-cache \
  --mount type=bind,source="$OUT/subject_repositories",target=/usr/src/app/subject_repositories \
  --mount type=bind,source="$OUT/analysis_outputs",target=/usr/src/app/analysis_outputs \
  "$IMAGE"
