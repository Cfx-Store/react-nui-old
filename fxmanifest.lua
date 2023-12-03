fx_version "cerulean"

description "Project template for FiveM with React, Tailwind, Vite and ShadCN"
author "CFXStore"
version "0.0.0"
repository "https://github.com/Cfx-Store/react-nui"

lua54 "yes"

ui_page "web/dist/index.html"

games {
  "gta5"
}

client_scripts {
  "src/client/**/*"
}

files {
  "web/dist/index.html",
  "web/dist/**/*"
}
