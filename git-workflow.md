# Git Workflow for ags-mcq Module

This document outlines the standard workflow for making changes, committing, tagging, and publishing updates to the `ags-mcq` Hugo module.

## 1. Development Workflow

### 1.1 Making Changes

1. Ensure you're on the correct branch:
   ```bash
   git checkout main   # For main branch changes
   # or
   git checkout dev    # For development changes
   ```

2. Make your code changes.

3. Test your changes locally:
   ```bash
   # Test with a Hugo site that imports this module
   cd /path/to/test/site
   hugo server -e development
   ```

### 1.2 Committing Changes

1. Check the status of your changes:
   ```bash
   git status
   ```

2. Add your changes to the staging area:
   ```bash
   git add .                  # Add all changes
   # or
   git add specific-file.ext  # Add specific files
   ```

3. Commit your changes with a meaningful message:
   ```bash
   git commit -m "Brief description of changes"
   ```

## 2. Version Management

### 2.1 Updating Version Numbers

1. Update version in package.json using npm:
   ```bash
   # For patch updates (1.0.0 -> 1.0.1)
   npm version patch

   # For minor updates (1.0.0 -> 1.1.0)
   npm version minor

   # For major updates (1.0.0 -> 2.0.0)
   npm version major
   ```

   This will:
   - Update the version in package.json
   - Create a git tag with the new version
   - Create a commit with the version change

### 2.2 Manual Version Update (alternative method)

If not using npm version:

1. Update the version in package.json manually.
2. Commit the change:
   ```bash
   git add package.json
   git commit -m "Bump version to x.y.z"
   ```
3. Create a tag:
   ```bash
   git tag -a v1.2.3 -m "Version 1.2.3"
   ```

## 3. Publishing Changes

### 3.1 Pushing to GitHub

1. Push commits:
   ```bash
   git push origin main  # Or the branch you're working on
   ```

2. Push tags:
   ```bash
   git push --tags
   ```

### 3.2 Creating a GitHub Release (Optional)

1. Go to the GitHub repository
2. Navigate to "Releases"
3. Click "Create a new release"
4. Select the tag
5. Add release notes
6. Publish the release

## 4. Module Dependency Management

### 4.1 Updating Dependencies

1. Update go.mod with new dependencies:
   ```bash
   # Add or update a dependency
   hugo mod get github.com/example/module@v1.2.3
   
   # Get the latest versions of all dependencies
   hugo mod get -u
   ```

2. Tidy the go.mod file:
   ```bash
   hugo mod tidy
   ```

3. Commit the updated go.mod and go.sum:
   ```bash
   git add go.mod go.sum
   git commit -m "Update dependencies"
   ```

### 4.2 Module Configuration

When adding or changing required module dependencies:

1. Update the imports in config.toml
2. Update the documentation in Readme.md to reflect new dependencies
3. Test that the module works with the new dependencies

## 5. Branch Strategy

### 5.1 Branch Naming Convention

- `main`: Production-ready code
- `dev`: Development branch for ongoing work
- `feature/name`: For new features
- `fix/issue-name`: For bug fixes

### 5.2 Merging Strategy

1. Develop new features on feature branches
2. Merge features into dev for testing
3. Once tested, merge dev into main for release
4. Tag the main branch for releases

## 6. Common Issues and Solutions

### 6.1 Resolving Merge Conflicts

```bash
git merge --abort  # Cancel the current merge
git pull           # Try again with the latest changes
# Resolve conflicts manually
git add .          # Add resolved files
git commit         # Complete the merge
```

### 6.2 Undoing Changes

```bash
# Undo uncommitted changes
git restore <file>

# Undo the last commit but keep changes
git reset HEAD~1

# Remove the last commit completely
git reset --hard HEAD~1
```
