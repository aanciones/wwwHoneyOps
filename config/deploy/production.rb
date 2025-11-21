server "46.224.78.20", user: "deploy", roles: %w[app db web]

set :branch, "main"
set :rails_env, "production"

# Variables que usará la tarea hpots:maintain
set :default_env, {
  "HPOT_AUTO_RESET_DAYS" => "1",  # ← 1 día en prod
  "HPOT_DISCONNECTED_MINUTES" => "2"
}
