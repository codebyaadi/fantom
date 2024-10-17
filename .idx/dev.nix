{ pkgs }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.bun
    pkgs.python312
  ];
  idx.extensions = [
    "dsznajder.es7-react-js-snippets"
    "esbenp.prettier-vscode"
    "oven.bun-vscode"
    "zhuangtongfa.material-theme"
    "bradlc.vscode-tailwindcss"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
