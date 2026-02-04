# Building Modern Web Applications with Angular, .NET, and OAuth 2.0 — Complete Tutorial Series

Learn how to build secure, scalable enterprise applications using the **CAT Pattern** (Client, API Resource, Token Service) with Angular 20, .NET 10, and Duende IdentityServer.

## 📚 Tutorial Series

### Part 1: Foundation
**[01-foundation.md](01-foundation.md)** — Understanding the CAT Pattern

**Topics covered:**
* What is the CAT Pattern?
* High-level architecture
* Key security features
* Getting started (prerequisites, installation)
* Quick start guide (running all components)
* Component deep dive (Angular, API, IdentityServer)
* Benefits of the CAT Pattern
* Next steps and customization ideas

**Perfect for:** Developers new to the CAT pattern, architects evaluating patterns, teams starting new projects

---

### Part 2: Token Service Deep Dive
**[02-token-service-deep-dive.md](02-token-service-deep-dive.md)** — OAuth 2.0, OIDC, and Duende IdentityServer

**Topics covered:**
* OAuth 2.0 fundamentals
* OpenID Connect (OIDC)
* Understanding tokens (Access, ID, Refresh)
* Duende IdentityServer overview
* Configuration deep dive
* Authentication flows (PKCE)
* Security best practices
* Testing and debugging
* Common issues and solutions

**Perfect for:** Understanding authentication and authorization, implementing OAuth 2.0/OIDC, securing SPAs

---

### Part 3: API Resource Deep Dive
**[03-api-resource-deep-dive.md](03-api-resource-deep-dive.md)** — Clean Architecture, Entity Framework Core, and RESTful Design

**Topics covered:**
* Clean Architecture fundamentals
* Domain Layer (entities, enums, exceptions)
* Application Layer (CQRS with MediatR, commands, queries, validators)
* Infrastructure Layer (EF Core, DbContext, configurations)
* WebApi Layer (controllers, authentication, authorization)
* JWT Bearer token validation
* Scope-based and role-based authorization
* Testing strategies (unit and integration tests)
* Best practices (DTOs, async/await, error handling, pagination)

**Perfect for:** Understanding Clean Architecture, implementing CQRS, securing APIs with JWT tokens

---

### Part 4: Angular Client Deep Dive
**[04-angular-client-deep-dive.md](04-angular-client-deep-dive.md)** — Modern SPA with Material Design and OIDC

**Topics covered:**
* Angular fundamentals (standalone components, DI, lifecycle)
* OIDC authentication setup and configuration
* Auth service, guards, and HTTP interceptors
* API communication and services
* Material Design UI components
* Forms (reactive forms, validation)
* Routing and navigation
* Role-based UI with ngx-permissions
* State management with Signals
* Component testing and service testing

**Perfect for:** Building modern Angular SPAs, implementing OIDC authentication, Material Design UIs

---

### Part 5: Advanced Topics
**[05-advanced-topics.md](05-advanced-topics.md)** — Git Submodules, Testing, Deployment, and Production

**Topics covered:**
* Git submodules deep dive (workflows, commands, best practices)
* Testing strategies (unit, integration, E2E with Playwright)
* Docker containerization (Dockerfiles, docker-compose)
* CI/CD pipelines (GitHub Actions)
* Production deployment (Azure, AWS)
* Monitoring and logging (Application Insights, Serilog)
* Performance optimization (caching, compression, lazy loading)
* Production security hardening

**Perfect for:** DevOps, production deployments, CI/CD automation, containerization

---

### Part 6: Real-World Features
**[06-real-world-features.md](06-real-world-features.md)** — CRUD Operations, Dashboard, Search, and Analytics

**Topics covered:**
* Complete CRUD implementation (Create, Read, Update, Delete)
* Dashboard with KPIs and analytics
* Charts and data visualization (Chart.js)
* Advanced search and filtering
* Pagination with server-side paging
* Data export (Excel, CSV)
* Multi-criteria search
* Real-world production patterns

**Perfect for:** Implementing production features, data visualization, search functionality

---

## 📖 How to Use This Tutorial

### For Learning
1. Start with **[Part 1: Foundation](01-foundation.md)** to understand the architecture
2. Continue with **[Part 2: Token Service](02-token-service-deep-dive.md)** to understand authentication
3. Follow the series sequentially for best results

### For Reference
* Jump to specific topics using the table of contents in each document
* Use the search function to find specific concepts
* Refer back to examples and code snippets

---

## 🔗 Navigation

* **[Repository README](../README.md)** — Project overview and setup
* **[Developer Guide (CLAUDE.md)](../CLAUDE.md)** — Technical reference for contributors
* **[Setup Submodules Guide](../SETUP-SUBMODULES.md)** — Git submodules setup instructions

---

## 📝 Documentation Format

### Main Tutorial (TUTORIAL.md)
* **Format:** Comprehensive reference with tables
* **Purpose:** Complete technical documentation
* **Audience:** Developers working with the codebase
* **Best for:** Reference, copy-paste examples, technical details

### Tutorial Series (docs/*.md)
* **Format:** Reader-friendly, no tables
* **Purpose:** Step-by-step learning and publishing
* **Audience:** Learners, blog readers, tutorial followers
* **Best for:** Learning flow, Medium.com publishing, sharing

---

## 🚀 Quick Links

**Getting Started:**
* [Prerequisites](01-foundation.md#-getting-started)
* [Quick Start Guide](01-foundation.md#quick-start-running-all-components)
* [First Login](01-foundation.md#first-login)

**Understanding Architecture:**
* [CAT Pattern Overview](01-foundation.md#-what-is-the-cat-pattern)
* [High-Level Architecture](01-foundation.md#-high-level-architecture)
* [Authentication Flow](01-foundation.md#authentication-flow)

**Component Details:**
* [Component Deep Dive](01-foundation.md#-component-deep-dive)
* [Angular Client](01-foundation.md#1-angular-client-presentation-tier)
* [API Resource](01-foundation.md#2-api-resource-business-logic-tier)
* [Token Service](01-foundation.md#3-token-service-authentication-tier)

**Authentication Deep Dive:**
* [OAuth 2.0 Fundamentals](02-token-service-deep-dive.md#-oauth-20-fundamentals)
* [OpenID Connect](02-token-service-deep-dive.md#-openid-connect-oidc)
* [Understanding Tokens](02-token-service-deep-dive.md#-understanding-tokens)
* [Security Best Practices](02-token-service-deep-dive.md#-security-best-practices)

**API Development:**
* [Clean Architecture](03-api-resource-deep-dive.md#-clean-architecture-fundamentals)
* [CQRS with MediatR](03-api-resource-deep-dive.md#-application-layer)
* [Entity Framework Core](03-api-resource-deep-dive.md#-infrastructure-layer)

**Angular Development:**
* [OIDC Authentication](04-angular-client-deep-dive.md#-oidc-authentication)
* [API Communication](04-angular-client-deep-dive.md#-api-communication)

**Advanced Topics:**
* [Git Submodules Workflow](05-advanced-topics.md#-git-submodules-deep-dive)
* [Docker & Docker Compose](05-advanced-topics.md#-docker-containerization)
* [CI/CD with GitHub Actions](05-advanced-topics.md#-cicd-pipelines)
* [Azure Deployment](05-advanced-topics.md#-production-deployment)

**Real-World Features:**
* [Complete CRUD](06-real-world-features.md#-complete-crud-implementation)
* [Result Wrapper Handling](06-real-world-features.md#-result-wrapper-handling)
* [Advanced Search with Field Shaping](06-real-world-features.md#-advanced-search-with-field-shaping)

---

## 📌 Tags

`#angular` `#dotnet` `#oauth2` `#openidconnect` `#identityserver` `#webdevelopment` `#authentication` `#security` `#cleanarchitecture` `#typescript` `#csharp` `#enterpriseapplications` `#fullstack` `#spa` `#jwt`

---

*Updated: February 2026*
