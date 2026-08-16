# 🔐 Password Sentinel

Build a modern, responsive **Password Strength Checker** web application with a premium UI and excellent user experience. 🛡️✨

## 📌 Project Name

**Password Strength Checker**

## 🎯 Goal

Create an interactive web app that analyzes password strength in real time and provides actionable feedback while users type. ⚡🔑

## 🛠️ Tech Stack

* ⚛️ React
* 🔷 TypeScript
* 🎨 Tailwind CSS
* 🎬 Framer Motion for animations
* ✨ Lucide React icons
* 📱 Responsive Design
* 🚫 No backend required

## 🎨 Design Requirements

* 🪟 Modern glassmorphism design
* 🌈 Beautiful gradient background
* 🔵 Rounded cards
* ✨ Smooth animations
* 🌓 Dark and Light mode toggle
* 📱 Mobile-first responsive layout
* 🔤 Professional typography
* 📊 Attractive progress bar
* 🌑 Soft shadows
* ♿ Accessible color contrast

## 🚀 Main Features

### 1. 🔑 Password Input

* Password field
* 👁️ Show/Hide password toggle
* 📋 Paste support
* 📑 Copy password button
* 🗑️ Clear button

### 2. 🔍 Live Password Analysis

Update instantly as the user types.

Check:

* 📏 Password length
* 🔠 Uppercase letters
* 🔡 Lowercase letters
* 🔢 Numbers
* 🔣 Special characters
* 🔁 Repeated characters
* 🔢 Sequential characters such as `abc` and `123`
* 🚨 Common passwords
* 📖 Dictionary words
* ⌨️ Keyboard patterns such as `qwerty` and `asdf`
* 🧮 Entropy estimation

### 3. 💪 Strength Levels

Display color-coded strength levels:

* 🔴 Very Weak
* 🟠 Weak
* 🟡 Fair
* 🟢 Good
* 🟩 Strong
* 🟢 Excellent

Include:

* 📊 Percentage score
* 🏷️ Strength label
* 🎞️ Animated progress bar

### 4. ✅ Password Requirements Checklist

Display live checkmarks:

* ✓ At least 8 characters
* ✓ At least 12 characters recommended
* ✓ Uppercase letter
* ✓ Lowercase letter
* ✓ Number
* ✓ Special character
* ✓ No repeated patterns
* ✓ No common password
* ✓ No sequential characters

### 5. 🛡️ Security Score

Score the password out of **100**.

Suggested weighting:

* 📏 Length: 30
* 🧩 Complexity: 25
* 🆕 Uniqueness: 20
* 🧮 Entropy: 15
* 🔍 Pattern Detection: 10

### 6. 💡 Feedback Section

Provide smart suggestions dynamically, such as:

* 💬 "Add uppercase letters."
* 💬 "Increase password length."
* 💬 "Avoid predictable sequences."
* 💬 "Use more unique symbols."
* 💬 "Avoid common words."

### 7. ⚙️ Password Generator

Include a **Generate Strong Password** button.

Options:

* 📏 Length slider: 8–64
* 🔠 Uppercase
* 🔡 Lowercase
* 🔢 Numbers
* 🔣 Symbols
* 🚫 Exclude ambiguous characters
* 📖 Easy-to-read mode
* 📋 Copy generated password

### 8. 📈 Strength Visualization

Include:

* 📊 Animated progress bar
* ⭕ Circular score indicator
* 🛡️ Security badge
* 📶 Password entropy meter

### 9. 📊 Password Statistics

Display:

* 📏 Length
* 🔤 Character count
* 🔠 Uppercase count
* 🔡 Lowercase count
* 🔢 Number count
* 🔣 Symbol count
* ⏱️ Estimated crack time
* 🧮 Entropy bits

### 10. ⏳ Estimated Crack Time

Examples:

* ⚡ Instantly
* ⏱️ Few minutes
* 🕐 Hours
* 📅 Days
* 📆 Months
* 🗓️ Years
* 🏛️ Centuries

### 11. 🎓 Educational Tips

Show cybersecurity tips:

* 🔐 Never reuse passwords.
* 🗝️ Use a password manager.
* 🔒 Enable MFA.
* 🚫 Avoid personal information.
* 🧩 Use random phrases.
* ⚠️ Rotate compromised passwords.

### 12. 🌓 Dark Mode

Implement a persistent dark/light theme using **local storage**.

### 13. ♿ Accessibility

Support:

* ⌨️ Keyboard navigation
* 🏷️ ARIA labels
* 🎯 Visible focus indicators
* 🔊 Screen reader compatibility
* 👁️ High contrast support

### 14. ⚡ Performance

Ensure:

* 🚀 Fast rendering
* ⏱️ Debounced calculations
* 🔄 No unnecessary re-renders
* 🎞️ Optimized animations

### 15. ✨ Animations

Include:

* 🎬 Smooth card entrance
* 📊 Animated progress bar
* ✅ Success check animations
* 🖱️ Button hover effects
* 🌊 Subtle floating background elements

## 🌟 Optional Extras

Consider adding:

* 🕘 Password history using local storage
* 📄 Export password report
* 📊 Strength comparison chart
* 🔒 Recent passwords with masked values
* 📴 Offline support
* 📱 PWA support

## 🧾 Footer

Display:

> 🛠️ Built with React + TypeScript + Tailwind CSS

Privacy notice:

> 🔐 **Passwords never leave your browser.**

## 🧠 Logic

Calculate the score using multiple factors instead of relying only on password length.

Detect:

* 🔁 Repeated characters
* 🔁 Repeated words
* ⌨️ Keyboard walks
* 📖 Dictionary passwords
* 🚨 Leaked/common passwords list
* 🔢 Sequential numbers
* 🔤 Sequential letters

### 🎁 Reward

* 📏 Longer passwords
* 🎲 Randomness
* 🧩 Character diversity

### ⚠️ Penalize

* 📖 Common words
* ⌨️ Predictable patterns
* 🔁 Repetition
* 📏 Short length

## 🧹 Code Quality

Use reusable React components and maintain a clean project architecture.

### 📁 Folder Structure

```text
components/
hooks/
utils/
types/
data/
```

Create utility functions for:

```text
calculateStrength()
estimateEntropy()
estimateCrackTime()
generatePassword()
validatePassword()
```

## 🎯 Final Deliverable

Produce a polished, production-ready web application with:

* 💎 Clean and modern UI
* 📱 Responsive design
* ⚡ Fast performance
* ✨ Smooth animations
* 🛡️ Strong password analysis
* 🔐 Privacy-focused architecture
* 🧹 Clean and reusable code
* 💼 Professional cybersecurity portfolio quality

---

## 💜 Built with Lovable

This project was built with [Lovable](https://lovable.dev). 🤖✨

### 🌐 Live App

[https://password-guard-locket.lovable.app](https://password-guard-locket.lovable.app)

### 🛠️ Continue Development

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0fde7558-1c15-4214-b694-c6be968b09cc).

* 🚀 **Ship faster:** Describe what you want to build and Lovable handles the code.
* 🔄 **Stay in sync:** Every change made in Lovable is committed straight to this repository.
* 💻 **Full ownership:** Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## 💻 Development

Prefer working locally? You need **Node.js** and **npm**.

### 📦 Install with nvm

[https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## 🔐 Privacy First

Password Sentinel is designed with a **client-side-first approach**.

🔒 Passwords are analyzed directly in the browser and never need to leave the user's device.
