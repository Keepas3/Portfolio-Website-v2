import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'livs52tc',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
    studioHost: 'bryandev-portfolio',
    appId: 't3hufc1wallwydoun9ebzmk8',
  },
})
