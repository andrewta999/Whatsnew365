import express from 'express'
import {get_rules_api, set_rule_api, 
        delete_a_rule_api, delete_all_rules_api, 
        start_streaming_api, stop_streaming_api} from '../controller/index'

const router = express.Router()

router.get('/rules', get_rules_api)
router.post('/rules', set_rule_api)

router.post('/delete', delete_a_rule_api)
router.get('/delete/all', delete_all_rules_api)

router.get('/stream', start_streaming_api)
router.get('/stop', stop_streaming_api)

export default router 