# Nitro Backend Starter

A lightweight and modular backend template built with [Nitro](https://nitro.build/), designed to accelerate the development of secure and scalable APIs. This starter kit integrates essential features like JWT authentication, encryption, and database connectivity, making it an ideal foundation for modern web applications.

## Features

* **Nitro-Powered**: Utilizes Nitro, a next-generation server toolkit, for rapid development and deployment.
* **JWT Authentication**: Implements JSON Web Token (JWT) for secure user authentication.
* **Nodemailer**: Send email's pogrammitically.
* **Encryption**: Includes built-in mechanisms for data encryption to enhance security. (nodejs - crypto)
* **Database Integration**: Pre-configured to connect with databases, facilitating data management. ( mongodb with mongoose)
* **Modular Structure**: Organized codebase promoting scalability and maintainability.

## Getting Started

### Prerequisites

* Node.js (version 16 or higher)
* Package Manager: [pnpm](https://pnpm.io/) or [npm](https://npmjs.org/)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/r2hu1/nitro-backend.git
   cd nitro-backend
   ```



2. **Install Dependencies**:

   ```bash
   pnpm install
   ```



3. **Configure Environment Variables**:

   Create a `.env` file in the root directory and populate it based on the `.env.example` provided.

4. **Run the Development Server**:

   ```bash
   pnpm dev
   ```



The server should now be running at `http://localhost:3000`.

## Project Structure

```
├── server
│   ├── middleware
│   │   ├── cors.ts
│   │   └── index.ts
│   ├── models
│   │   ├── otp.ts
│   │   └── user.ts
│   ├── plugins
│   │   ├── env.ts
│   │   └── mongoose.ts
│   ├── routes
│   │   ├── auth
│   │   │   ├── forgot-password.post.ts
│   │   │   ├── login.post.ts
│   │   │   ├── register.post.ts
│   │   │   └── reset-password.post.ts
│   │   ├── email
│   │   │   └── send-otp.get.ts
│   │   ├── index.ts
│   │   └── user
│   │       ├── delete.delete.ts
│   │       ├── get.get.ts
│   │       └── verify-otp.post.ts
│   └── utils
│       ├── auth.ts
│       ├── crypto.ts
│       ├── db_helper
│       │   ├── connect.ts
│       │   └── save-otp.ts
│       └── mail_helper
│           └── send-email.ts
├── package.json
├── nitro.config.ts
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.json

```



## Scripts

* **Start Development Server**: `pnpm dev`
* **Build for Production**: `pnpm build`
* **Start Production Server**: `pnpm start`

## Contributing

Contributions are welcome! If you have suggestions for improvements or encounter any issues, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

* [Nitro](https://nitro.build/) for the powerful server toolkit.
* [UnJS](https://github.com/unjs) for maintaining Nitro and related tools.
