const createApp = require('./app')
const { port } = require('./config/env')
createApp().listen(port, () => console.log(`LLD Practice API listening on http://localhost:${port}`))
