FROM python:3.8-slim-buster AS base

# Build target for dev envirioment
FROM base AS dev

WORKDIR /usr/src/app
   
COPY requirements.txt .
COPY ./app/ ./app/
COPY ./api.py ./api.py

RUN pip install -r requirements.txt

CMD ["python", "api.py"]

# Intermidiate stage for building the wheel file for production
FROM base AS builder
WORKDIR /usr/src/app

COPY --from=dev /usr/src/app/app/ ./app/
COPY --from=dev /usr/src/app/api.py/ ./
COPY setup.py .
COPY MANIFEST.in .
RUN python setup.py bdist_wheel

# Stage for building the final production container
FROM base AS prod

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist/Capability_Marketplace_API-1.0-py3-none-any.whl .
RUN pip install Capability_Marketplace_API-1.0-py3-none-any.whl

CMD waitress-serve --port=$PORT --call app:create_app
