import { extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'

for (let rule in rules) {
  extend(rule, rules[rule])
}
localize({
  en
})
