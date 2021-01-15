#!/usr/bin/env

TAP_PATH=/keg/tap

if [[ "$DOC_APP_PATH" ]]; then
  TAP_PATH="$DOC_APP_PATH"
fi

keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_tap_yarn_setup(){

  # Check if $KEG_NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$KEG_NM_INSTALL" ]]; then
    return
  fi

  if [[ "$KEG_NM_INSTALL" != "core" ]]; then
    # Navigate to the cached directory, and run the yarn install here
    cd $TAP_PATH
    keg_message "Running yarn setup for tap..."
    yarn install
  fi
  
  if [[ "$KEG_NM_INSTALL" ]]; then
    if [[ -d "$TAP_PATH/node_modules/keg-core" ]]; then
      keg_message "Running yarn install for keg-core..."
      cd $TAP_PATH/node_modules/keg-core
      yarn install
    fi
  fi

}

# Runs a Tap
keg_run_the_tap(){

  cd $TAP_PATH

  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="tap:start"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# If the no KEG_DOCKER_EXEC env is set, just sleep forever
# This is to keep our container running forever
if [[ -z "$KEG_DOCKER_EXEC" ]]; then
  tail -f /dev/null
  exit 0

else

  # Run yarn setup for any extra node_modules to be installed
  keg_run_tap_yarn_setup

  # Start the keg core instance
  keg_run_the_tap
fi
