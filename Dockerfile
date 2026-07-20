# LLMutantKiller artifact container.
#
# The image contains the runnable LLMutantKiller implementation and its
# dependencies. Paper results remain outside the container under paper_results/.
FROM node:20.19.4-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    git \
    jq \
    python3 \
    python3-pip \
    vim \
    && npm install -g npm@11.5.1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY source-code/package*.json ./source-code/

WORKDIR /usr/src/app/source-code
RUN npm ci

WORKDIR /usr/src/app
COPY source-code ./source-code

WORKDIR /usr/src/app/source-code
RUN npm run build

WORKDIR /usr/src/app
RUN mkdir -p \
    /usr/src/app/subject_repositories \
    /usr/src/app/source-code/generated_tests \
    /usr/src/app/source-code/llm-cache \
    /usr/src/app/analysis_outputs

COPY paper_results/Evaluation/compute_mutator_association.py ./analysis/
COPY paper_results/Evaluation/mutator_analysis_input.csv ./analysis/

CMD ["/bin/bash"]
