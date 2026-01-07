# Petaniku Contribution Guide 🌟

Thank you for your interest in contributing to **Petaniku**! This document outlines the contribution process to ensure effective and quality collaboration.

## 📚 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting New Features](#suggesting-new-features)
- [Development Process](#development-process)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Review Process](#review-process)
- [Development Environment Setup](#development-environment-setup)
- [Testing](#testing)
- [Community](#community)

## 📜 Code of Conduct

This project and all its participants are governed by the [Petaniku Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the management team.

## 🤝 How to Contribute

### Accepted Contribution Types:

1. **Reporting bugs** 🐛
2. **Suggesting new features** 💡
3. **Fixing bugs** 🔧
4. **Developing features** 🚀
5. **Improving documentation** 📖
6. **Enhancing testing** ✅
7. **Code review** 👀
8. **Helping the community** 🤗

### Contribution Steps:

#### 1. **Repository Setup**

```bash
# Fork the repository
# Click the 'Fork' button on GitHub

# Clone your fork locally
git clone https://github.com/your-username/petaniku.git
cd petaniku

# Add upstream remote
git remote add upstream https://github.com/original/petaniku.git

# Create a new branch
git checkout -b feature/feature-name
```

#### 2. **Development Environment Setup**

See [Development Environment Setup](#development-environment-setup) for complete instructions.

#### 3. **Make Your Changes**

- Follow [Code Standards](#code-standards)
- Write descriptive commit messages
- Update documentation if needed
- Add tests when possible

#### 4. **Test Your Changes**

```bash
# Frontend testing
cd frontend
npm test

# Backend testing
cd backend
npm test
```

#### 5. **Push and Create Pull Request**

```bash
git push origin feature/feature-name
```

Then open a Pull Request on the GitHub repository.

## 🐛 Reporting Bugs

### Bug Issue Template:

```markdown
## Bug Description

[Clear description of the bug]

## Steps to Reproduce

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior

[What should have happened]

## Screenshots/Video

[If applicable, add screenshots or video]

## Environment

- OS: [e.g., Windows, macOS, Linux]
- Browser: [e.g., Chrome, Firefox]
- Version: [e.g., v0.1.0-beta]

## Additional Information

[Any other relevant information]
```

### Good Bug Criteria:

- Reproducible
- Specific and clear
- Contains sufficient context
- Not a duplicate of existing issues

## 💡 Suggesting New Features

### Feature Request Template:

```markdown
## Feature Description

[What feature are you suggesting?]

## Problem Solved

[What problem does this feature solve?]

## Proposed Solution

[How would this feature work?]

## Alternatives Considered

[Are there any alternatives?]

## Impact

- Users: [Impact on users]
- Performance: [Performance impact]
- Security: [Security implications]

## Mockups/Screenshots

[If available, add designs]

## Additional Context

[Any additional information]
```

## 🏗️ Development Process

### Branch Strategy:

```
main
  ├── develop
  │   ├── feature/chat-websocket
  │   ├── feature/payment-gateway
  │   └── bugfix/login-validation
  ├── release/v0.1.0
  └── hotfix/production-issue
```

### Branch Naming Convention:

- `feature/feature-name` - For new features
- `bugfix/bug-description` - For bug fixes
- `hotfix/urgent-issue` - For critical fixes
- `docs/update-readme` - For documentation
- `refactor/restructure-code` - For refactoring

## 📝 Code Standards

### Frontend (React + TypeScript)

```typescript
// Naming conventions
interface UserProfile {        // PascalCase for interfaces
  id: number;
  fullName: string;           // camelCase for properties
}

const getUserData = () => {};  // camelCase for functions
const MAX_RETRIES = 3;         // UPPER_SNAKE_CASE for constants

// Component structure
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect
}) => {
  // Hooks at the top
  const [isLoading, setIsLoading] = useState(false);

  // Handler functions
  const handleClick = () => {
    // Logic here
  };

  // Return JSX
  return (
    <div className="product-card">
      {/* JSX */}
    </div>
  );
};
```

### Backend (Express + TypeScript)

```typescript
// File structure
src/
├── controllers/
│   └── product.controller.ts
├── services/
│   └── product.service.ts
├── models/
│   └── Product.ts
└── routes/
    └── product.routes.ts

// Error handling
try {
  // Business logic
} catch (error) {
  logger.error('Error in product service:', error);
  throw new AppError('Product not found', 404);
}
```

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add real-time chat with WebSocket
fix: resolve login validation issue
docs: update API documentation
style: format code with prettier
refactor: reorganize product module
test: add unit tests for auth service
chore: update dependencies
```

## 🔄 Pull Request Process

### Checklist Before Submitting PR:

- [ ] Code follows coding standards
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No conflicts with main branch
- [ ] All tests pass
- [ ] Code coverage hasn't decreased

### PR Template:

```markdown
## Change Description

[Describe the changes made]

## Type of Change

- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that breaks existing functionality)
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests performed
- [ ] Manual testing performed

## Screenshots

[If UI changed, add screenshots]

## Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have reviewed my own code
- [ ] I have commented my code, particularly in complex areas
- [ ] I have made corresponding documentation updates
- [ ] My changes generate no new warnings
```

## 👁️ Review Process

### Review Criteria:

1. **Code Quality**
   - Follows coding standards
   - Clean code principles
   - No code smells

2. **Functionality**
   - Meets requirements
   - No regression bugs
   - Performance considerations

3. **Testing**
   - Adequate test coverage
   - Edge cases covered
   - Integration tests working

4. **Documentation**
   - README updated if needed
   - API docs updated
   - Clear code comments

### Review Process:

1. **Initial Review** (24-48 hours)
   - Maintainer assigns reviewers
   - Automated checks (CI/CD) run

2. **Review Round**
   - Reviewers provide feedback
   - Contributor addresses feedback
   - Iterate until approval

3. **Approval & Merge**
   - Minimum 2 approvals required
   - Squash merge to develop branch
   - Delete feature branch

### How to Become a Reviewer:

1. Have deep understanding of the code area
2. Provide constructive feedback
3. Focus on improvement, not criticism
4. Respect established timelines

## 🛠️ Development Environment Setup

### 1. **Clone & Install Dependencies**

```bash
# Clone repository
git clone https://github.com/satellacodes/petaniku.git
cd petaniku

# Install dependencies
cd frontend && npm install
cd ../backend && npm install
```

### 2. **Environment Variables**

```bash
# Backend .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=petaniku_dev
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your_jwt_secret
WS_PORT=8080

# Frontend .env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:8080
```

### 3. **Database Setup**

```bash
# Using Docker
docker-compose up db

# Or manual setup
createdb petaniku_dev
psql -U postgres -d petaniku_dev -f database/schema.sql
```

### 4. **Development Servers**

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm start

# Terminal 3: WebSocket Server
cd backend
npm run websocket
```

## ✅ Testing

### Frontend Testing

```bash
cd frontend
npm test              # Run tests
npm run test:coverage # Test coverage
npm run test:e2e      # E2E testing
```

### Backend Testing

```bash
cd backend
npm test              # Run tests
npm run test:coverage # Test coverage
npm run test:integration # Integration tests
```

### Test Coverage Requirements

- Unit Tests: > 80%
- Integration Tests: > 70%
- Critical Paths: 100%

## 📖 Documentation

### Documentation Areas:

1. **API Documentation** - Swagger/OpenAPI specs
2. **Component Documentation** - Storybook for frontend
3. **Architecture Docs** - Diagrams and architecture explanations
4. **Deployment Guide** - Deployment instructions
5. **User Guide** - User manuals

### Update Documentation:

```bash
# Generate API docs
cd backend
npm run docs:generate

# Run Storybook
cd frontend
npm run storybook
```

## 🚀 Deployment & Release

### Versioning:

Using [Semantic Versioning](https://semver.org/)

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

### Release Process:

1. **Feature Freeze** - 1 week before release
2. **Testing Phase** - Regression and integration testing
3. **Release Candidate** - Tag RC for external testing
4. **Production Release** - Tag final version
5. **Hotfix Process** - For critical bugs

### Beta Release Checklist:

- [ ] All tests pass
- [ ] Security audit completed
- [ ] Performance testing completed
- [ ] Documentation updated
- [ ] Changelog created
- [ ] Release notes prepared

## 🌐 Community

### Communication Channels:

- **GitHub Issues** - Bug reports and feature requests
- **Discord/Slack** - Real-time discussions

### Getting Help:

1. Check documentation first
2. Search existing issues
3. Create new issue if not found
4. Join community channels

## 📊 Contribution Metrics

Contributions are evaluated based on:

- **Quality**: Code and documentation quality
- **Impact**: Impact on the project
- **Consistency**: Contribution consistency
- **Collaboration**: Collaboration ability

### Recognition:

- **Contributor** - After first PR merged
- **Active Contributor** - 5+ PRs merged
- **Core Contributor** - Maintainer access
- **Project Maintainer** - Full repository access

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

## 🙏 Thank You

Thank you for contributing to making Petaniku better! Every contribution, big or small, is greatly appreciated and helps Indonesian farmers.

---

**Note:** This is a living document and may change. Please create an issue or PR if you have improvement suggestions.

---

<div align="center">
  <p>Together building a better agricultural ecosystem! 🌱</p>
</div>
