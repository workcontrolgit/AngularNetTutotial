# Building Modern Web Applications with Angular, .NET, and OAuth 2.0 — Complete Tutorial Series

Learn how to build secure, scalable enterprise applications using the **CAT Pattern** (Client, API Resource, Token Service) with Angular 20, .NET 10, and Duende IdentityServer.

![Architecture Diagram](https://via.placeholder.com/800x400?text=CAT+Pattern+Architecture)

---

## 📚 Tutorial Series Overview

### Part 1: Foundation
**Understanding the CAT Pattern**

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

**Read Part 1:** [01-foundation.md](01-foundation.md)

---

### Part 2: Token Service Deep Dive
**OAuth 2.0, OIDC, and Duende IdentityServer**

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

**Read Part 2:** [02-token-service-deep-dive.md](02-token-service-deep-dive.md)

---

### Part 3: API Resource Deep Dive
**Clean Architecture, Entity Framework Core, and RESTful Design**

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

**Read Part 3:** [03-api-resource-deep-dive.md](03-api-resource-deep-dive.md)

---

### Part 4: Angular Client Deep Dive
**Modern SPA with Material Design and OIDC**

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

**Read Part 4:** [04-angular-client-deep-dive.md](04-angular-client-deep-dive.md)

---

### Part 5: Advanced Topics
**Git Submodules, Testing, Deployment, and Production**

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

**Read Part 5:** [05-advanced-topics.md](05-advanced-topics.md)

---

### Part 6: Real-World Features
**CRUD Operations, Dashboard, Search, and Analytics**

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

**Read Part 6:** [06-real-world-features.md](06-real-world-features.md)

---

## 🧪 Hands-On Labs

**Want to learn by doing?** Follow our progressive hands-on labs that teach practical skills by building with the actual source code.

**[View All Labs →](labs/README.md)**

### Progressive Learning Labs

**LAB-01: Setup Verification (20 minutes)**
* **Focus:** Verify development environment and Git submodules
* **Prerequisites:** Git, .NET SDK 10.0+, Node.js 20.x
* **What you'll do:** Clone repository, initialize submodules, start all services, test authentication flow
* **Start here:** [LAB-01: Verify Setup](labs/LAB-01-verify-setup.md)

**LAB-02: JWT Token Inspection (30 minutes)**
* **Focus:** Understand OAuth 2.0 tokens and authentication flow
* **Prerequisites:** LAB-01 completed
* **What you'll do:** Inspect ID tokens, access tokens, and refresh tokens using browser DevTools
* **Continue to:** [LAB-02: Inspect JWT Tokens](labs/LAB-02-inspect-tokens.md)

**LAB-03: Clean Architecture Vertical Slice (30 minutes)**
* **Focus:** Extend API with new property through all layers
* **Prerequisites:** LAB-01, LAB-02 completed
* **What you'll do:** Add "Notes" field to Employee entity (Domain → Migration → Application → Testing)
* **Continue to:** [LAB-03: Extend API](labs/LAB-03-extend-api.md)

**LAB-04: Angular Material Component (45 minutes)**
* **Focus:** Build search component with Material Design and RxJS
* **Prerequisites:** LAB-03 completed
* **What you'll do:** Create employee search component with reactive forms, debouncing, and data tables
* **Continue to:** [LAB-04: Build Component](labs/LAB-04-build-component.md)

**LAB-05: Unit Testing (60 minutes)**
* **Focus:** Write comprehensive unit tests for backend and frontend
* **Prerequisites:** LAB-04 completed
* **What you'll do:** Test validators, services, and components using xUnit and Jasmine
* **Continue to:** [LAB-05: Write Tests](labs/LAB-05-write-tests.md)

**LAB-06: Docker Containerization (60 minutes)**
* **Focus:** Containerize all three CAT Pattern components
* **Prerequisites:** LAB-05 completed
* **What you'll do:** Create Dockerfiles, compose multi-container application, configure networking
* **Continue to:** [LAB-06: Docker Deployment](labs/LAB-06-docker-deployment.md)

---

## 📖 How to Use This Tutorial

### Three Learning Approaches

**Approach 1: Theory First**

Start with comprehensive guides to understand concepts before implementation.

1. Start with **Part 1: Foundation** to understand the architecture
2. Continue with **Part 2: Token Service** to understand authentication
3. Follow the series sequentially through Part 6

**Approach 2: Practice First**

Jump straight into hands-on coding with step-by-step labs.

1. Complete **LAB-01: Verify Setup** to ensure your environment is ready
2. Follow labs **LAB-02 through LAB-06** in sequence
3. Reference tutorial parts as needed for deeper understanding

**Approach 3: Blended Learning (Recommended)**

Alternate between theory and practice for optimal retention.

1. **Read Part 1** (Foundation) — Understand the big picture
2. **Complete LAB-01** — Verify your setup works
3. **Read Part 2** (Token Service) — Learn authentication theory
4. **Complete LAB-02** — Inspect JWT tokens hands-on
5. **Read Part 3** (API Resource) — Learn Clean Architecture
6. **Complete LAB-03** — Build vertical slice through API
7. **Read Part 4** (Angular Client) — Learn Angular patterns
8. **Complete LAB-04** — Build Angular component
9. **Complete LAB-05** — Add unit tests
10. **Read Part 5** (Advanced Topics) — Learn Docker & deployment
11. **Complete LAB-06** — Containerize the application
12. **Read Part 6** (Real-World Features) — Production patterns

---

## 🗺️ Quick Navigation

### Essential Documentation

* **Repository README** — Project overview and quick start guide
* **Setup Submodules Guide** — Git submodules configuration and troubleshooting
* **CODE-MAP.md** — Find anything in the codebase quickly with role-based learning paths
* **CLAUDE.md** — Developer guide for AI-assisted development

### Practice Resources

* **All Labs** — Complete hands-on practice exercises (LAB-01 through LAB-06)
* **Lab Solutions** — Full solution code for LAB-03, LAB-04, and LAB-05
* **GitHub Repository** — Access complete source code and clone instructions

---

## 🎯 What You'll Master

### Core Technologies

* **Angular 20** — Modern SPA development with standalone components and Signals
* **.NET 10** — Clean Architecture with CQRS, MediatR, and Entity Framework Core
* **Duende IdentityServer 7.0** — OAuth 2.0 and OpenID Connect authentication
* **Material Design** — Beautiful, responsive UI components
* **Docker** — Containerization and orchestration with Docker Compose
* **Git Submodules** — Multi-repository project management

### Architecture Patterns

* **CAT Pattern** — Client, API Resource, Token Service separation
* **Clean Architecture** — Domain-centric design with SOLID principles
* **CQRS** — Command Query Responsibility Segregation
* **Repository Pattern** — Data access abstraction
* **OAuth 2.0 / OIDC** — Industry-standard authentication protocols

### Development Skills

* **Security** — JWT tokens, scopes, roles, PKCE flow
* **Testing** — Unit tests, integration tests, E2E tests
* **DevOps** — CI/CD pipelines, containerization, deployment
* **Best Practices** — Error handling, validation, async patterns
* **Real-World Features** — CRUD, search, pagination, data export

---

## 💡 Benefits of the CAT Pattern

✅ **Security** — Industry-standard OAuth 2.0/OIDC authentication with JWT tokens

✅ **Scalability** — Independent scaling of each component based on demand

✅ **Maintainability** — Clear separation of concerns makes code easier to understand and modify

✅ **Flexibility** — Technology-agnostic architecture allows component replacement

✅ **Team Productivity** — Multiple teams can work on different components simultaneously

✅ **Testability** — Each component can be tested independently with clear boundaries

✅ **Reusability** — Token Service can authenticate multiple clients and APIs

✅ **Production-Ready** — Proven patterns used by enterprise applications worldwide

---

## 🚀 Getting Started

### Prerequisites

**Development Tools:**
* **.NET SDK 10.0+** — Build and run .NET applications — [Download](https://dotnet.microsoft.com/download)
* **Node.js 20.x LTS** — Run Angular development server — [Download](https://nodejs.org/)
* **npm 10+** — Package manager for Node.js — Included with Node.js
* **Git (Latest)** — Version control and submodules — [Download](https://git-scm.com/)
* **Visual Studio Code** — Recommended code editor — [Download](https://code.visualstudio.com/)

**Technical Knowledge:**
* **Basic C# and TypeScript** — Syntax and basic programming concepts
* **REST API concepts** — HTTP methods, status codes, JSON
* **Git basics** — Clone, commit, push, pull operations
* **Command line basics** — Terminal/PowerShell navigation

### Quick Start (5 Minutes)

**Step 1: Clone the repository**
```bash
git clone --recurse-submodules https://github.com/workcontrolgit/AngularNetTutorial.git
cd AngularNetTutorial
```

**Step 2: Start IdentityServer (Terminal 1)**
```bash
cd TokenService/Duende-IdentityServer/src/Duende.STS.Identity
dotnet run
```

**Step 3: Start API (Terminal 2)**
```bash
cd ApiResources/TalentManagement-API
dotnet run
```

**Step 4: Start Angular (Terminal 3)**
```bash
cd Clients/TalentManagement-Angular-Material/talent-management
npm install
npm start
```

**Step 5: Open browser**
* Navigate to http://localhost:4200
* Click "Sign In"
* Login with username: `ashtyn1` / password: `Pa$$word123`

**Success!** You're now running a complete OAuth 2.0 authenticated application with Angular, .NET, and IdentityServer.

---

## 🎓 Next Steps

### After Completing the Tutorial

**Customize the Application:**
* Add new entities and CRUD operations
* Implement your own business logic
* Create custom UI components
* Add additional API endpoints

**Enhance Security:**
* Configure multi-factor authentication
* Implement refresh token rotation
* Add API rate limiting
* Configure CORS policies

**Deploy to Production:**
* Deploy to Azure App Service or AWS
* Configure SSL certificates
* Set up Application Insights monitoring
* Implement CI/CD pipelines

**Expand Your Knowledge:**
* Study OAuth 2.0 specification in depth
* Explore advanced Angular patterns (NgRx, RxJS)
* Learn Kubernetes orchestration
* Master Azure/AWS cloud services

---

## 🔗 Learning Resources

### Official Documentation

* **OAuth 2.0 and OpenID Connect** — https://oauth.net/2/
* **Duende IdentityServer** — https://docs.duendesoftware.com/
* **ASP.NET Core** — https://docs.microsoft.com/aspnet/core/
* **Angular** — https://angular.dev/
* **Material Design** — https://material.angular.io/

### Community Support

* **GitHub Repository** — https://github.com/workcontrolgit/AngularNetTutorial
* **GitHub Issues** — Report bugs and request features
* **Pull Requests** — Contribute improvements and fixes
* **Discussions** — Ask questions and share experiences

---

## 🤝 Support and Contribution

### How to Get Help

**Found a bug or issue?**
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

**Have questions?**
1. Review the relevant tutorial part
2. Check lab solutions for examples
3. Consult CODE-MAP.md for navigation help

**Want to suggest improvements?**
1. Open a GitHub issue describing the improvement
2. Submit a pull request with your changes
3. Follow contribution guidelines in the repository

### Ways to Contribute

* **Improve Documentation** — Fix typos, clarify instructions, add examples
* **Report Issues** — Help identify bugs and inconsistencies
* **Submit Pull Requests** — Contribute code improvements and new features
* **Share Feedback** — Let us know what worked well and what could be better
* **Write Blog Posts** — Share your learning journey with the community
* **Create Videos** — Tutorial walkthroughs and explanations

---

## 🎉 Conclusion

You now have access to a comprehensive tutorial series covering:

✅ Complete CAT Pattern implementation with Angular, .NET, and IdentityServer
✅ Six progressive hands-on labs with full solution code
✅ Clean Architecture with CQRS and MediatR
✅ OAuth 2.0 and OpenID Connect authentication
✅ Docker containerization and deployment
✅ Testing strategies (unit, integration, E2E)
✅ Production-ready patterns and best practices

**Ready to start?** Begin with **[LAB-01: Verify Setup](labs/LAB-01-verify-setup.md)** or dive into **[Part 1: Foundation](01-foundation.md)** to understand the architecture first.

**Happy coding!** 🚀

---

📌 **Tags:** #angular #dotnet #oauth2 #openidconnect #identityserver #webdevelopment #authentication #security #cleanarchitecture #typescript #csharp #enterpriseapplications #fullstack #spa #jwt #materialdesign #docker #kubernetes #devops #tutorial
