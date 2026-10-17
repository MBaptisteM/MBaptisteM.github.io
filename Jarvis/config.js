const JARVIS_CONFIG = {

  // ── META ──────────────────────────────────────────────────
  meta: {
    author: "Baptiste Mahé",
    year: 2026,
    version: "1.0",
    license: "Personal use only. No copying, redistribution, resale, or commercial use permitted.",
    github: "https://github.com/MBaptisteM/Jarvis",
  },

  // ── HERO TERMINAL ANIMATION ───────────────────────────────
  // Lines typed one after another in the hero terminal
  terminalLines: [
    "jarvis auth",
    "jarvis clone",
    "jarvis clone current",
    "jarvis pull",
    "jarvis push",
    "jarvis find",
    "jarvis go",
    "jarvis custom",
    "jarvis help",
  ],

  // ── OVERVIEW CARDS ────────────────────────────────────────
  overviewCards: [
    {
      icon: "🔍",
      title: "Find any TP",
      desc: "Locate any practical work instantly across all semesters and bimesters.",
    },
    {
      icon: "📁",
      title: "Stay organized",
      desc: "Repositories are automatically classified by semester, bimester and concepts.",
    },
    {
      icon: "☁️",
      title: "Backup everything",
      desc: "Your entire academic history synced to a personal GitHub archive.",
    },
    {
      icon: "⚡",
      title: "Written in C",
      desc: "Lightweight, fast, open source command-line tool with no bloat.",
    },
  ],

  // ── FEATURES ──────────────────────────────────────────────
  features: [
    {
      number: "01",
      title: "Authentication",
      desc: "Authenticate directly with your EPITA Forge account through a secure login workflow. Sessions are persisted and cookies stored for future executions — log in once, run forever.",
      bullets: [
        "Secure login workflow",
        "Session persistence",
        "Cookie storage for future executions",
        "Automatic reuse of saved sessions",
        "Automatically locates or clones your root repository if needed",
      ],
    },
    {
      number: "02",
      title: "Enhanced Clone",
      desc: "Unlike a traditional git clone, Jarvis performs a complete repository analysis: detects subject, semester and bimester, downloads provided files, analyzes specs and reconstructs the expected project structure.",
      bullets: [
        "Clone the repository",
        "Detect subject, semester & bimester",
        "Download provided files & subject",
        "Reconstruct the expected project structure",
        "Rename and organize automatically",
        "Synchronize changes when enabled",
      ],
    },
    {
      number: "03",
      title: "Automatic Tree Structure Organization",
      desc: "Jarvis maintains a structured workspace, automatically classifying every repository by semester, bimester and main concepts covered — so your TPs directory is always clean.",
      bullets: [
        "Classified by semester",
        "Sub-classified by bimester",
        "Tagged with main concepts",
        "Consistent naming convention",
      ],
    },
    {
      number: "04",
      title: "GitHub Integration",
      desc: "Optionally create and manage a personal GitHub archive. Every cloned project can be synchronized automatically — your entire academic history backed up and accessible forever.",
      bullets: [
        "Auto-creates a GitHub repository",
        "Becomes the root archive of all work",
        "Every project synchronized automatically",
        "Long-term archival and code reuse",
      ],
    },
    {
      number: "05",
      title: "Sync & Locate",
      desc: "Keep every repository up to date and find any of them instantly — from a single TP to your entire workspace, submodules included.",
      bullets: [
        "Pull one repository, or everything at once",
        "Submodules are initialized and pulled recursively",
        "Stale submodule commits are automatically resynced with their remote",
        "Locate a repository by its title, its git remote, or by keyword",
        "Jump straight into a repository with jarvis go",
      ],
    },
    {
      number: "06",
      title: "Customizable Organization",
      desc: "Choose how your workspace is laid out: add a Year layer, drop the Bimester one, rename the prefixes. When you leave the menu, Jarvis moves your existing repositories to match, and can push the result.",
      bullets: [
        "Enable or disable the Year, Semester and Bimester layers",
        "Choose the prefix written before each number (S, Semester, …)",
        "Existing repositories are moved to their new location",
        "Save to apply the changes and push the root repository",
      ],
    },
  ],

  // ── FILE TREE ─────────────────────────────────────────────
  treeDisplay: `TPs/
├── S1/
│   ├── B1/
│   │   ├── E1-Name-concept1-concept2/
│   │   ├── P1-Name-concept1-concept2/
│   │   ├── P2-Name-concept1-concept2/
│   │   └── P3-Name-concept1-concept2/
│   │
│   └── B2/
│       ├── E1-Name-concept1-concept2/
│       └── P1-Name-concept1-concept2/
│
└── S2/
    └── B1/
        └── E1-Name-concept1-concept2/`,

  treeClassifiers: [
    "Year (Y1, Y2, …) — optional, see jarvis custom",
    "Semester (S1, S2, …)",
    "Bimester (B1, B2, …)",
    "Assignment type (E = Exam, P = Project)",
    "Main concepts covered",
  ],

  // ── COMMANDS ──────────────────────────────────────────────
  commands: [
    {
      name: "auth",
      usage: "jarvis auth",
      desc: "Authenticate with your EPITA Forge account.",
      steps: [
        "A browser window is opened",
        "You authenticate on EPITA Forge",
        "Jarvis stores the session",
        "Future executions reuse the saved session",
        "Your root repository is located (or cloned if it doesn't exist yet)",
      ],
      example: "jarvis auth",
    },
    {
      name: "clone",
      usage: "jarvis clone [all | current | <remote-repository>]",
      desc: "Clone and organize a repository with full analysis. Without argument, finds or clones your root repository.",
      steps: [
        "No argument, or 'all': finds your root repository, or clones it if it doesn't exist yet",
        "'current': lists your Forge projects so you can pick the one to clone",
        "A remote repository: it is cloned",
        "Placed in the correct workspace location",
        "Tree structure is generated",
        "Given files and subject are downloaded",
        "Project structure is generated",
        "Repository is renamed",
        "GitHub archive is updated if enabled",
      ],
      example: "jarvis clone firstname.lastname@git.forge.epita.fr:p/example/repository.git",
    },
    {
      name: "pull",
      usage: "jarvis pull [all | current | <repository>]",
      desc: "Pull the latest changes for one, several, or all of your repositories, submodules included.",
      steps: [
        "No argument, or 'all': pulls the root repository and every submodule",
        "'current': pulls the repository currently marked as active",
        "A specific repository: pulls it directly if it has already been cloned",
        "Submodules are initialized, checked out and pulled recursively",
        "A submodule whose pinned commit is no longer reachable is automatically resynced with its remote's default branch",
      ],
      example: "jarvis pull",
    },
    {
      name: "push",
      usage: "jarvis push [root | current | <path>] [commit name] [tag]",
      desc: "Commit and push a repository together with the root repository.",
      steps: [
        "No argument: pushes the repository of the current folder",
        "'current': pushes the repository currently marked as active",
        "'root': pushes only the root repository",
        "Changes are added and committed with an automatic, numbered name unless you give one",
        "An optional tag can be added, its number is incremented automatically if it already exists",
        "The root repository is updated and pushed at the same time",
      ],
      example: "jarvis push current",
    },
    {
      name: "find",
      usage: "jarvis find [root | current | <repository> | <keyword>]",
      desc: "Locate the local path of a repository without touching it.",
      steps: [
        "No argument, or 'root': prints the path of the root repository",
        "'current': prints the path of the currently active repository",
        "A known git remote: prints its local path, re-locating it automatically if it moved",
        "Any other word: searches every repository title under the root repository and prints the matching paths",
      ],
      example: "jarvis find",
    },
    {
      name: "go",
      usage: "jarvis go [root | current | <repository> | <keyword>]",
      desc: "Move into a repository. Works like find, but takes you there.",
      steps: [
        "No argument, or 'root': goes to the root repository",
        "'current': goes to the currently active repository",
        "A known git remote, or any word contained in a repository title",
        "If several folders match, a menu lets you choose one",
        "Your shell is opened in the chosen folder, type 'exit' to come back",
      ],
      example: "jarvis go current",
    },
    {
      name: "custom",
      usage: "jarvis custom",
      desc: "Customize the tree structure of your repositories.",
      steps: [
        "Layers: enable or disable the Year, Semester and Bimester folders (default: Semester and Bimester)",
        "Prefixes: choose the text written before each number (default: Y, S, B)",
        "Reset: go back to the default organization",
        "Save: moves your existing repositories to the new organization and pushes the root repository",
        "Quit: moves your existing repositories to the new organization without pushing",
        "Repositories in the Others folder are never moved",
      ],
      example: "jarvis custom",
    },
    {
      name: "erase",
      usage: "jarvis erase",
      desc: "Back up, empty and push the root repository.",
      steps: [
        'Confirmation prompt before anything is deleted: "Continue? [y/N]"',
        "A backup of the root repository is pushed first (force-with-lease: remote-only commits are replaced)",
        "All the content of the root repository is deleted, except .git",
        "The cleaned root repository is pushed",
        "The command to restore the backup is printed (git restore --source=<backup-hash>), then run 'jarvis push root' to publish the restored files",
        "Ignored files are not part of the backup and cannot be restored",
      ],
      example: "jarvis erase",
    },
    {
      name: "help",
      usage: "jarvis help [command]",
      desc: "List the commands, or explain one of them.",
      steps: [
        "No argument: lists every command",
        "With a command name: shows its usage and examples",
        "'<command> --help' works too",
        "Shortcuts: a (auth), c (clone), pl (pull), ps (push), f (find), g (go), h (help)",
        "'j' can be used instead of 'jarvis' (ex: j c, j g, j pl)",
      ],
      example: "jarvis help clone",
    },
    {
      name: "uninstall",
      usage: "jarvis uninstall",
      desc: "Remove Jarvis from the system.",
      steps: [
        'Confirmation prompt: "Are you sure you want to uninstall Jarvis? [y/N]"',
        "Jarvis is removed from the system",
      ],
      example: "jarvis uninstall",
    },

    // ── ADD NEW COMMANDS HERE ──────────────────────────────
    // {
    //   name: "sync",
    //   usage: "jarvis sync",
    //   desc: "Manually sync all repositories to GitHub.",
    //   steps: ["Scans workspace", "Pushes changes to GitHub archive"],
    //   example: null,
    // },
  ],

};