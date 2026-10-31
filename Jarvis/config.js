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
    "jarvis fill",
    "jarvis pull",
    "jarvis push",
    "jarvis format",
    "jarvis tidy",
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
        "Secure login workflow, in a browser window (default) or directly in the console",
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
        "Rename the Others folder",
        "Enable the automatic code formatting before each push and choose which file extensions are formatted",
        "Choose what is done with jarvis tidy before each push: nothing, warn or fix",
        "Existing repositories are moved to their new location when you leave the menu",
        "The root repository can be pushed right away",
      ],
    },
    {
      number: "07",
      title: "Code Formatting",
      desc: "Format your code with clang-format in one command, or automatically before every push.",
      bullets: [
        "jarvis format [&lt;path&gt;] formats every supported file of the current folder (or of the given folder) and its sub-folders",
        "The automatic format before jarvis push is disabled by default, enable it in jarvis custom",
        "The formatted extensions can be edited (add / remove / restore the default list)",
        "A formatting problem is reported but never blocks a push",
      ],
    },
    {
      number: "08",
      title: "Code Style Check",
      desc: "Check the style rules of your C / C++ code in one command, or automatically before every push.",
      bullets: [
        "jarvis tidy [&lt;path&gt;] scans every C / C++ file of the current folder (or of the given folder) and its sub-folders",
        "Every problem is listed as &lt;file&gt;:&lt;line&gt;: &lt;problem&gt;",
        "Problems that can be fixed (include guard names, #endif comments, final newline) are fixed on request, or without asking with --fix",
        "The automatic behavior before jarvis push (nothing, warn or fix) is set in jarvis custom, and is disabled by default",
      ],
    },
  ],

  // ── FILE TREE ─────────────────────────────────────────────
  treeDisplay: `EPITA-TPs/
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
├── S2/
│   └── B1/
│       └── E1-Name-concept1-concept2/
│
└── Others/
    └── repository-whose-course-cannot-be-deduced/`,

  treeClassifiers: [
    "Year (Y1, Y2, …) — optional, see jarvis custom (EPITA-TPs/Y1/S1/B2/…)",
    "Semester (S1, S2, …)",
    "Bimester (B1, B2, …)",
    "Assignment type (E = Exam, P = Project)",
    "Main concepts covered",
    "Others — repositories whose course can't be deduced",
  ],

  // ── COMMANDS ──────────────────────────────────────────────
  commands: [
    {
      name: "auth",
      usage: "jarvis auth",
      desc: "Authenticate with your EPITA Forge account.",
      steps: [
        "You choose how to authenticate: Browser (default) or Console",
        "Browser: a window is opened, you authenticate on EPITA Forge and close it",
        "Console: you type your username and password, and Jarvis signs in and gets the cookies by itself (the password is hidden, sent to the login script through its standard input, and never saved)",
        "Jarvis stores the session",
        "Future executions reuse the saved session",
        "Your root repository is located (or cloned if it doesn't exist yet)",
        "Without a terminal (script, pipe), the browser is used without asking",
      ],
      example: "jarvis auth",
    },
    {
      name: "clone",
      usage: "jarvis clone [all | current/c/cu/cur/curr | &lt;remote-repository&gt;]",
      desc: "Clone and organize a repository with full analysis. Without argument, finds or clones your root repository.",
      steps: [
        "No argument, or 'all': finds your root repository, or clones it if it doesn't exist yet",
        "'current' (or 'c', 'cu', 'cur', 'curr'): lists your Forge projects so you can pick the one to clone",
        "A remote repository: it is cloned",
        "If it is an EPITA repository:",
        "Placed in the correct workspace location",
        "Tree structure is generated",
        "Given files and subject are downloaded",
        "Project structure is generated",
        "Repository is renamed",
        "GitHub archive is updated if enabled",
      ],
      example: "jarvis clone [all | current/c/cu/cur/curr | &lt;remote-repository&gt;]",
    },
    {
      name: "fill",
      usage: "jarvis fill [old | all | current/now | &lt;project&gt;]",
      desc: "Clone many repositories of the forge at once.",
      steps: [
        "No argument, 'old', 'anc', 'ancient' or 'past': every finished repository",
        "'all': every repository, finished or not",
        "'current' or 'now': only the repositories that are not finished",
        "A project (ex: epita-prepa-computer-science): every repository listed on the page of that project",
        "Each repository is cloned like jarvis clone does, without any question",
        "Repositories already cloned are skipped, and the content of a repository that is not empty is never changed",
        "A repository whose course can't be deduced goes in Others/&lt;project&gt;/ (ex: Others/epita-prepa-computer-science/)",
        "A repository whose course is known is placed by its semester/bimester, whatever its project",
        "The root repository is pushed once at the end",
      ],
      example: "jarvis fill [old | all | current/now | &lt;project&gt;]",
    },
    {
      name: "pull",
      usage: "jarvis pull [all | current/c/cu/cur/curr | &lt;repository&gt;]",
      desc: "Pull the latest changes for one, several, or all of your repositories, submodules included.",
      steps: [
        "No argument, or 'all': pulls the root repository and every repository of the tree",
        "'current' (or 'c', 'cu', 'cur', 'curr'): pulls the repository currently marked as active",
        "A specific repository: pulls it directly if it has already been cloned",
        "Submodules are initialized, checked out and pulled recursively",
        "A submodule whose pinned commit is no longer reachable is automatically resynced with its remote's default branch",
      ],
      example: "jarvis pull [all | current/c/cu/cur/curr | &lt;repository&gt;]",
    },
    {
      name: "push",
      usage: "jarvis push [root | current/c/cu/cur/curr | &lt;path&gt;] [-n &lt;name&gt;] [-t &lt;tag&gt;] [-p &lt;path&gt;]",
      desc: "Commit and push a repository together with the root repository.",
      steps: [
        "No argument: pushes the repository of the current folder",
        "'current' (or 'c', 'cu', 'cur', 'curr'): pushes the repository currently marked as active",
        "'root': pushes only the root repository (never formatted)",
        "'&lt;path&gt;': pushes the repository located at this path",
        "-n, --name &lt;name&gt;: name of the commit (an automatic, numbered name is generated otherwise, or the name of the tag if there is one)",
        "-t, --tag &lt;name&gt;: creates and pushes a tag named &lt;name&gt;-&lt;number&gt; (ex: v1 gives v1-0, then v1-1…)",
        "-p, --path &lt;path&gt;: same as &lt;path&gt;; 'root' and 'current' also work as values",
        "--name=&lt;name&gt;, --tag=&lt;name&gt; and --path=&lt;path&gt; work too; an unknown option stops the command with an error",
        "If the automatic format is enabled, the repository is formatted before it is committed",
        "The tidy mode set in jarvis custom decides what is done with jarvis tidy before the push: nothing (default), warn (on a problem, you choose to push anyway or to cancel) or fix (fixable problems are fixed in the files, the others are reported like with warn)",
        "The repository is pushed first, then the root repository, which records its new state",
        "A problem (failed git add, rejected push, unreachable remote…) is reported but doesn't stop the other steps",
        "'Pushed' is displayed only when commits were really sent; otherwise Jarvis tells you why (and suggests jarvis pull if needed)",
        "When there is nothing to push, Jarvis lists what git does not see: empty folders (add a .gitkeep) and ignored files",
        "A summary of what was pushed and what was not is printed, and the exit code is not zero if something failed",
      ],
      example: "jarvis push [root | current/c/cu/cur/curr | &lt;path&gt;] [-n &lt;name&gt;] [-t &lt;tag&gt;] [-p &lt;path&gt;]",
    },
    {
      name: "format",
      usage: "jarvis format [&lt;path&gt; | -p &lt;path&gt;]",
      desc: "Format the code of the current folder with clang-format.",
      steps: [
        "No argument: formats the current folder",
        "'&lt;path&gt;' (or '-p', '--path &lt;path&gt;'): formats this existing folder instead",
        "Runs clang-format -i on every file of the folder and its sub-folders having a configured extension",
        "clang-format must be installed; the .clang-format file closest to each file is used",
        "Extensions are compared without taking the case into account (.c, .h, .cpp, .hpp, .js, .ts, .java, .json… by default)",
        ".git and node_modules folders are skipped",
        "A file that can't be formatted is reported and does not stop the others",
        "Extensions and the automatic run before each jarvis push are set in jarvis custom &gt; Format",
      ],
      example: "jarvis format [&lt;path&gt; | -p &lt;path&gt;]",
    },
    {
      name: "tidy",
      usage: "jarvis tidy [-f | --fix] [&lt;path&gt; | -p &lt;path&gt;]",
      desc: "Check the style rules of the code of the current folder.",
      steps: [
        "No argument: checks the current folder",
        "'&lt;path&gt;' (or '-p', '--path &lt;path&gt;'): checks this folder instead",
        "Scans every C / C++ file (.c .h .cc .cpp .cxx .hh .hpp .hxx) of the folder and its sub-folders, and lists every problem as &lt;file&gt;:&lt;line&gt;: &lt;problem&gt; in an Info panel",
        "Nothing is modified without your answer: fixable problems (include guard names, #endif comments, final newline) are fixed if you accept, the others stay to fix by hand",
        "'-f', '--fix': fixes what can be fixed without asking, and reports the rest (nothing is asked outside a terminal)",
        "A function with too many lines or arguments is never modified; the exit code is not zero when a problem is left",
        "Checks: at most 4 arguments and 30 lines per function, final newline, #endif followed by a comment with the name of its #if, header guard #ifndef &lt;FILE NAME&gt;_H followed by #define with the same name",
        "Blank lines, comments and lines made of braces only are not counted in the lines of a function; .git and node_modules folders are skipped",
        "What is done automatically before each jarvis push (nothing, warn or fix) is set in jarvis custom &gt; Tidy",
      ],
      example: "jarvis tidy [-f | --fix] [&lt;path&gt; | -p &lt;path&gt;]",
    },
    {
      name: "find",
      usage: "jarvis find [root | current/c/cu/cur/curr | &lt;repository&gt; | &lt;keyword&gt;]",
      desc: "Locate the local path of a repository without touching it.",
      steps: [
        "No argument, or 'root': prints the path of the root repository",
        "'current' (or 'c', 'cu', 'cur', 'curr'): prints the path of the currently active repository",
        "A known git remote: prints its local path, re-locating it automatically if it moved",
        "Any other word: searches every repository title under the root repository and prints the matching paths",
      ],
      example: "jarvis find [root | current/c/cu/cur/curr | &lt;repository&gt; | &lt;keyword&gt;]",
    },
    {
      name: "go",
      usage: "jarvis go [root | current/c/cu/cur/curr | &lt;repository&gt; | &lt;keyword&gt;]",
      desc: "Move into a repository. Works like find, but takes you there.",
      steps: [
        "No argument, or 'root': goes to the root repository",
        "'current' (or 'c', 'cu', 'cur', 'curr'): goes to the currently active repository",
        "A known git remote, or any word contained in a repository title",
        "If several folders match, a menu lets you choose one",
        "jarvis go changes the current shell's directory, so 'cd -' returns to the previous directory",
        "Shell integration is enabled for Bash, Zsh and Fish by the installer and takes effect in new shells",
      ],
      example: "jarvis go [root | current/c/cu/cur/curr | &lt;repository&gt; | &lt;keyword&gt;]",
    },
    {
      name: "custom",
      usage: "jarvis custom",
      desc: "Customize the tree structure and the format (layers, prefixes, Others, Format, Tidy).",
      steps: [
        "Menus are chosen with the arrows and enter (prefixes, names and extensions are typed)",
        "Layers: enable or disable the Year, Semester and Bimester folders (default: Semester and Bimester)",
        "Prefixes: choose the text written before each number (default: Y, S, B)",
        "Others: rename the folder used when the course can't be deduced (default: Others)",
        "Format: enable or disable the automatic jarvis format before each push (default: disabled)",
        "Format &gt; add / remove: type one or several extensions separated by commas — case and spaces are ignored, the leading dot is optional",
        "Format &gt; show the list / restore the default ones",
        "Tidy: choose what jarvis tidy does before each push: nothing (default), warn (if problems are found, you choose to push anyway or to cancel) or fix (names, comments and newlines are fixed in the files, the other problems are reported)",
        "Reset: go back to the default organization",
        "Save: moves your existing repositories to the new organization and pushes the root repository",
        "Quit: moves your existing repositories to the new organization without pushing",
        "Settings are stored in the .jarvis_config file of the root repository, shared by every Jarvis using it (Format and Tidy settings are saved immediately; use Save to push them)",
        "Repositories in the Others folder are never moved (unless the folder is renamed)",
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
        "The command to restore the backup is printed (git restore --source=&lt;backup-hash&gt;), then run 'jarvis push root' to publish the restored files",
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
        "With the name or the shortcut of a command: shows its usage and examples",
        "'&lt;command&gt; --help' works too",
        "Shortcuts: a (auth), c (clone), fl (fill), pl (pull), ps (push), fm (format), t (tidy), f (find), g (go), h (help)",
        "erase, custom and uninstall have no shortcut (erase and uninstall are destructive on purpose)",
        "'j' can be used instead of 'jarvis' (ex: j c, j g, j pl)",
      ],
      example: "jarvis help [command]",
    },
    {
      name: "help counter",
      usage: "jarvis help counter",
      desc: "How the Jarvis user counter works.",
      steps: [
        "Jarvis counts its users with the stars of its GitHub repository (MBaptisteM/Jarvis)",
        "The first time you use Jarvis in a terminal while connected to GitHub (gh), it asks whether you accept to be counted",
        "If you say yes, a star is added to the repository with your GitHub account",
        "The question is asked only once, your answer is saved and Jarvis works the same whatever you answer",
        "The counter is not anonymous: the list of the people who starred a repository is public on GitHub",
        "This way was chosen because it is the simplest to show publicly how many people use Jarvis without an external server",
        "To leave the count, remove the star on the GitHub page of the repository",
      ],
      example: "jarvis help counter",
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
    //   example: "jarvis sync",
    // },
  ],

};