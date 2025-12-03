# Docker Installation Guide

This guide walks you through installing Docker on Ubuntu.

## Prerequisites

- Ubuntu system with sudo access
- Internet connection

## Installation Steps

### 1. Update your system

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install required packages

```bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```

### 3. Add Docker's official GPG key

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### 4. Add Docker repository

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 5. Update package list

```bash
sudo apt update
```

### 6. Install Docker

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

### 7. Start and enable Docker

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### 8. Verify Docker installation

```bash
docker --version
```

You should see something like:

```
Docker version 24.0.2, build c7e4f1a
```

### 9. (Optional) Run Docker without sudo

```bash
sudo usermod -aG docker $USER
```

Then log out and log back in, or run:

```bash
newgrp docker
```

## Test Installation

Test that Docker is working correctly:

```bash
docker run hello-world
```

You should see a confirmation message that Docker is working.

## Troubleshooting

If you encounter permission issues, make sure you've added your user to the docker group (step 9) and logged out/in or run `newgrp docker`.

