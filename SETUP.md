# Guide de Setup - Dom-Onyxk

Ce guide vous explique comment configurer et lancer Dom-Onyxk pour la première fois.

## Prérequis

- Docker et Docker Compose installés
- Accès en ligne de commande (Terminal)


## Version simple

- Run create_env_files.sh
- Run docker compose up --build -d
- Run restore_db.sh

## Étapes de Setup

### 1. Réinitialiser l'environnement Docker (optionnel mais recommandé)

Si vous avez déjà une installation précédente et souhaitez repartir de zéro :

```bash
cd deployment/docker_compose
./reset.sh
```

Ou manuellement :

```bash
cd deployment/docker_compose
docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v
docker volume prune -f
docker network prune -f
```

### 2. Créer les fichiers de configuration `.env`

Depuis la racine du projet :

```bash
./create_env_files.sh
```

Ce script crée automatiquement :
- `backend/.env` avec les configurations Enterprise Edition
- `web/.env` avec les configurations Enterprise Edition
- `deployment/docker_compose/.env` avec toutes les configurations Docker Compose

### 3. Lancer Docker Compose

```bash
cd deployment/docker_compose
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Cette commande démarre tous les services nécessaires :
- API Server
- Web Server
- PostgreSQL Database
- Vespa (Index)
- Redis (Cache)
- MinIO (S3)
- Model Servers
- Nginx

### 4. Restaurer la base de données (si nécessaire)

Si vous avez un dump de base de données à restaurer :

```bash
cd ../..
./restore_db.sh
```

Ou manuellement :

```bash
docker compose -f deployment/docker_compose/docker-compose.yml -f deployment/docker_compose/docker-compose.prod.yml exec relational_db psql -U postgres -d onyx < votre_dump.sql
```

### 5. Vérifier que les services sont démarrés

```bash
cd deployment/docker_compose
docker compose -f docker-compose.yml -f docker-compose.prod.yml ps
```

Tous les services devraient être en état "Up" ou "running".

### 6. Accéder à l'application

Une fois tous les services démarrés, vous pouvez accéder à l'application via :

- **Interface Web** : http://localhost:3000 (ou le port configuré dans nginx)
- **API** : http://localhost:8080

## Création du premier compte administrateur

**Important** : Le premier utilisateur créé devient automatiquement **administrateur**.

Cela signifie que :
- Il a accès à tous les panneaux d'administration
- Il peut gérer les utilisateurs, les assistants, les connecteurs
- Il peut configurer les paramètres système
- Il peut inviter d'autres utilisateurs

Pour créer votre compte admin :
1. Accédez à l'interface web (http://localhost:3000)
2. Cliquez sur "Créer un compte" ou "Sign up"
3. Remplissez le formulaire avec votre email et mot de passe
4. Vous serez automatiquement connecté en tant qu'administrateur

## Commandes utiles

### Voir les logs

```bash
cd deployment/docker_compose
# Tous les services
docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f

# Un service spécifique
docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f api_server
```

### Arrêter les services

```bash
cd deployment/docker_compose
docker compose -f docker-compose.yml -f docker-compose.prod.yml down
```

### Redémarrer un service

```bash
cd deployment/docker_compose
docker compose -f docker-compose.yml -f docker-compose.prod.yml restart api_server
```

### Accéder à un conteneur

```bash
cd deployment/docker_compose
docker compose -f docker-compose.yml -f docker-compose.prod.yml exec api_server bash
```

Pour vider la whitelist (inscription libre) :

```bash
cd deployment/docker_compose
docker compose -f docker-compose.yml -f docker-compose.prod.yml exec cache redis-cli DEL INVITED_USERS
```

## Dépannage

### Les services ne démarrent pas

1. Vérifiez que les ports ne sont pas déjà utilisés
2. Vérifiez les logs : `docker compose logs`
3. Vérifiez que Docker a assez de ressources (mémoire, CPU)

### Erreur "User not on allowed user whitelist"

Videz la whitelist (voir section ci-dessus) ou ajoutez votre email à la liste.

### Erreur de connexion à la base de données

Attendez quelques secondes que PostgreSQL soit complètement démarré, puis redémarrez les services :

```bash
cd deployment/docker_compose
docker compose -f docker-compose.yml -f docker-compose.prod.yml restart api_server background
```

## Support

Pour plus d'informations, consultez :
- La documentation officielle d'Onyx : https://docs.onyx.app
- Le README du projet
- Les logs Docker pour diagnostiquer les problèmes

