#!/bin/bash
# Script pour réinitialiser complètement Onyx (conteneurs + volumes)

set -e

echo "🛑 Arrêt et suppression des conteneurs et volumes..."

# Arrêter et supprimer avec volumes
docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v 2>/dev/null || \
docker compose down -v 2>/dev/null || true

echo "🧹 Nettoyage des volumes orphelins..."
docker volume prune -f

echo "🧹 Nettoyage des réseaux orphelins..."
docker network prune -f

echo "✅ Reset complet terminé!"
echo ""
echo "Pour redémarrer, utilisez:"
echo "  docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d"
echo "ou"
echo "  docker compose up -d"

