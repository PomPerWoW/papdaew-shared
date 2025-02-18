# Papdaew Shared Package

## Overview

A shared utilities and common functionality package for Papdaew microservices architecture. This package provides standardized implementations of logging, error handling, middleware, and other utilities used across all Papdaew services.

## Table of Contents

- [Papdaew Shared Package](#papdaew-shared-package)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Core Utilities](#core-utilities)
    - [Middleware](#middleware)
    - [Monitoring \& Debugging](#monitoring--debugging)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [API Reference](#api-reference)
    - [Logger Class](#logger-class)
    - [Error Classes](#error-classes)
    - [Middleware](#middleware-1)
    - [Utilities](#utilities)
    - [Development](#development)
    - [Testing](#testing)

## Features

### Core Utilities

- 🔄 Standardized Error Handling
- 📝 Centralized Logging System
- 🔍 Request Tracking (Request ID)
- ⚡ Async Handler Utility

### Middleware

- 🛡️ Common Security Middleware
- 📊 Request Logging
- 🔐 CORS Configuration
- ⏱️ Rate Limiting

### Monitoring & Debugging

- 📈 Performance Metrics
- 🏥 Health Check Utilities
- 🐛 Debug Helpers

## Project Structure

```
services/papdaew-shared/
├── src/
│   ├── errors/           # Error handling utilities
│   ├── logger/           # Logging implementation
│   ├── middleware/       # Common middleware
│   ├── utils/           # General utilities
│   ├── monitoring/      # Monitoring tools
│   ├── security/        # Security utilities
│   └── constants/       # Shared constants
├── tests/               # Test files
└── docs/               # Documentation
```

## Installation

1. Add the package to your service:

```bash
npm install @papdaew/shared
```

2. Configure in your service:

```javascript
const { Logger, errorHandler } = require('@papdaew/shared');
```

## API Reference

### Logger Class

- `new Logger(options)`
  - `options.name` - Service name
  - `options.level` - Log level
  - `options.serviceVersion` - Service version
  - `options.environment` - Environment

### Error Classes

- `CustomError`
- `NotFoundError`
- `BadRequestError`
- `UnauthorizedError`
- `ForbiddenError`
- `ValidationError`
- `ConflictError`
- `TooManyRequestsError`

### Middleware

- `requestId` - Adds unique request ID
- `errorHandler` - Global error handling
- `requestLogger` - HTTP request logging
- `cors` - CORS configuration

### Utilities

- `asyncHandler` - Async route wrapper
- `validators` - Common validation helpers
- `metrics` - Performance monitoring

### Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# Build
npm run build
```

### Testing

```bash
# Run all tests
npm test

# Run specific test
npm test -- path/to/test

# Run with coverage
npm run test:coverage
```
