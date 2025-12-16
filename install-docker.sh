#!/bin/bash

set -e

echo "🚀 Installation de Docker sur Ubuntu"

# 1. Mise à jour du système
echo "🔄 Mise à jour du système..."
sudo apt update
sudo apt upgrade -y

# 2. Installation des paquets requis
echo "📦 Installation des dépendances..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 3. Ajout de la clé GPG Docker
echo "🔑 Ajout de la clé GPG Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 4. Ajout du dépôt Docker
echo "➕ Ajout du dépôt Docker..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. Mise à jour des paquets
echo "🔄 Mise à jour des dépôts..."
sudo apt update

# 6. Installation de Docker
echo "🐳 Installation de Docker..."
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 7. Démarrage et activation de Docker
echo "▶️ Démarrage de Docker..."
sudo systemctl start docker
sudo systemctl enable docker

# 8. Ajout de l'utilisateur au groupe docker
echo "👤 Ajout de l'utilisateur au groupe docker..."
sudo usermod -aG docker $USER

# 9. Vérification
echo "✅ Docker installé avec succès !"
docker --version

echo ""
echo "⚠️ IMPORTANT : Déconnecte-toi puis reconnecte-toi"
echo "ou exécute : newgrp docker"
echo ""
echo "🧪 Test : docker run hello-world"
