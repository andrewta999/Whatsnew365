import app from './app'
import config from './config'

function main(){
    app.listen(config.PORT, () => {
        console.log(`App listening on port ${config.PORT}`)
    })
}

main() 

