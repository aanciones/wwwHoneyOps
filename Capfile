# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

# SCM setup
require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

# Framework and tools
require "capistrano/rbenv"
require "capistrano/bundler"
require "capistrano/rails"
require "capistrano/yarn"
require "capistrano/puma"
require "capistrano/puma/nginx"

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob("lib/capistrano/tasks/*.rake").sort.each { |r| import r }
