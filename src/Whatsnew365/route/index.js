import express from 'express'
import {get_rules_api, set_rule_api, 
        delete_a_rule, delete_all_rules, 
        start_streaming, stop_streaming} from '../controller/index'

const router = express.Router()

router.get('/rules', get_rules_api)
router.post('/rules', set_rule_api)

router.post('/delete', delete_a_rule)
router.get('/delete/all', delete_all_rules)

router.get('/stream', start_streaming)
router.get('/stop', stop_streaming)

export default router 