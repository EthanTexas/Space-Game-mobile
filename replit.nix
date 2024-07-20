{ pkgs }: {
  deps = [
    pkgs.nodejs-16_x
    pkgs.yarn
  ];
  permittedInsecurePackages = [
    "nodejs-16.20.0"
  ];
}
