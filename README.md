# Bitcoin Heater OS: Open-Source Heater Management for Mining Equipment

Welcome to the Bitcoin Heater OS repository! This project provides an open-source (MIT) software solution that allows you to efficiently control and manage your heater system based on mining equipment. 
By integrating cryptocurrency mining capabilities into your heating system, you can earn Bitcoin while keeping your surroundings warm.

## Key Features:

1. **Mining Equipment Integration**: Bitcoin Heater OS seamlessly integrates with your mining equipment, enabling you to mine Bitcoin while utilizing the generated heat to warm your space.

2. **Optimal Heat Utilization**: The software intelligently manages the mining process to strike a perfect balance between efficient cryptocurrency mining and effective heat production.

3. **Temperature Control**: Take full control of your heating system with the ability to set temperature thresholds and ensure a comfortable environment throughout the day.

4. **Energy Efficiency**: Bitcoin Heater OS prioritizes energy efficiency, allowing you to make the most out of your mining operation without excessive power consumption.

5. **User-Friendly Interface**: Our intuitive interface simplifies the setup and management process, making it accessible to both beginners and experienced users.

6. **Security and Safety**: We prioritize security, ensuring that your mining operations and equipment are protected from potential threats.

7. **Customizable Settings**: Tailor the software to your specific needs by adjusting mining strategies, temperature preferences, and other relevant parameters.

8. **Constant Updates and Improvements**: Our dedicated team continuously works on improving the software, providing regular updates and bug fixes to enhance the user experience.

## Contributions Welcome:

Bitcoin Heater OS is an open-source project, and we welcome contributions from the community. Feel free to participate by suggesting improvements, reporting issues, or submitting pull requests to help us enhance the software.

Join our Telegram channel to get latest updates and support on this exciting journey to revolutionize the way you manage your heater system: https://t.me/MigodiOfficial

*Disclaimer: Please be mindful of your energy consumption and the associated costs before integrating cryptocurrency mining with your heating system.*


# Hardware
- Raspberry Pi
- Miner
	- Vnish / [MinerDashApi](https://bitbucket.org/anthill-farm/miner-dash-api/)
	- BraiinsOS (soon)

## Requirements
- Ubuntu ^22.04
- git

## Components

### System
- Node.js ^18
- pm2
- isc-dhcp-server
- UFW
- redis
- X11
- chromium-browser

### UI
- Vuejs

### API
- express
- axios
- ioredis
- 

## Project Structure

### api

Contains the API which feeds the data to the UI.

Communicates with the Miner API.

Based on Express.

`bin/api` contains the starting script, `bin` contains misc control scripts.

Helpers are located in `helpers`.

The actual API logic is defined in `routes`:

#### routes/index.js

**/summary**

Provides current state to the UI.

**/restarting**

Tells the API, that the UI is currently restarting (fulfilling restart needs).

#### routes/settings.js

**/settings**

Provides the current settings to the UI.

**/settings/language**

Changes the language.

**/settings/heating-level**

Configures the Heating Level on the Miner.

**/settings/electricity**

Stores Electricity configuration from UI.

**/settings/mining-pool**

Configures the mining pool on the Miner.

### conf

Contains various OS level configs which are used on setup.

### dist

Contains the packaged project which can be deployed to the device.

### ui

Contains the User Interface, written in `Vue.js`.

Communicates with `api`.

The entry point is `index.html`, the API can be configured in `config.json`.

Branding can be done in `tailwind.config.js` and `src/assets`.

The different views are located in `src/views`, `src/stores` contains the shared global state, routing is done in `src/router/index.js`, locales are defined in `src/locales`, helpers are located in `src/helpers` and components which are used in views are located in `src/components`.  

Building is done via `vite`, see `build.sh`

### build.sh

Builds the API and UI into `dist`, which can be deployed to the device.

### setup.sh

Contains steps to setup a new Device. Only needed once.
