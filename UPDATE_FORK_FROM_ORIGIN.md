# 📖 Documentation : Mettre à jour un fork Git avec l'upstream

Cette documentation explique comment synchroniser ton fork Git avec le dépôt original (upstream).

## 1️⃣ Vérifier les remotes

Pour savoir quels dépôts sont configurés :

```bash
git remote -v
```

**Exemple de résultat :**

```
origin    git@github.com:Tristanchrt/Dom-Onyxk.git (fetch)
origin    git@github.com:Tristanchrt/Dom-Onyxk.git (push)
upstream  https://github.com/onyx-dot-app/onyx.git (fetch)
upstream  https://github.com/onyx-dot-app/onyx.git (push)
```

- **origin** → ton fork
- **upstream** → le dépôt original

### Si upstream n'existe pas :

```bash
git remote add upstream https://github.com/onyx-dot-app/onyx.git
```

## 2️⃣ Se placer sur la branche principale

```bash
git checkout main
```

## 3️⃣ Récupérer les dernières modifications du dépôt original

```bash
git fetch upstream
```

## 4️⃣ Mettre à jour ta branche main

### Option A : Merge

Garde l'historique des merges :

```bash
git merge upstream/main
```

### Option B : Rebase

Crée un historique linéaire (plus propre) :

```bash
git rebase upstream/main
```

> ⚠️ **Note :** Si des conflits apparaissent, Git te demandera de les résoudre avant de continuer.

## 5️⃣ Pousser les changements sur ton fork

```bash
git push origin main
```

## 6️⃣ Méthode rapide en une seule commande

```bash
git fetch upstream && git rebase upstream/main && git push origin main
```

## 7️⃣ Astuce : Réinitialiser ton fork exactement comme l'upstream

Si tu veux ignorer complètement tes commits locaux et avoir exactement le même état que le dépôt original :

```bash
git fetch upstream
git checkout main
git reset --hard upstream/main
git push origin main --force
```

> ⚠️ **Attention :** Cette méthode supprime tous tes commits locaux sur la branche main.

---

✅ Avec ça, ton fork est toujours à jour avec l'upstream.
