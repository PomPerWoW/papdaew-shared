# Contributing to Papdaew Shared

## Git Flow Process

1. **Feature Development**

   ```bash
   git flow feature start feature-name
   # Make your changes
   git flow feature finish feature-name
   ```

2. **Release Process**

   ```bash
   git flow release start 1.x.x
   # Update version in package.json
   # Update CHANGELOG.md
   git flow release finish 1.x.x
   ```

3. **Hotfix Process**
   ```bash
   git flow hotfix start hotfix-name
   # Fix the issue
   git flow hotfix finish hotfix-name
   ```

## Branch Naming Convention

- Feature branches: `feature/feature-name`
- Release branches: `release/1.x.x`
- Hotfix branches: `hotfix/issue-name`

## Commit Message Format

```
type(scope): subject

body

footer
```

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

## Release Process

1. Create release branch:

   ```bash
   git flow release start 1.x.x
   ```

2. Update version:

   ```bash
   npm run release:patch  # or minor/major
   ```

3. Finish release:

   ```bash
   git flow release finish 1.x.x
   ```

4. Push tags:
   ```bash
   git push origin main develop --tags
   ```
