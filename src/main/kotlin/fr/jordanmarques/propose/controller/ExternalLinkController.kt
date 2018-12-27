package fr.jordanmarques.propose.controller

import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod.GET
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api")
class ExternalLinkController{

    @Value("\${majorityjudgment.address}")
    lateinit var majorityJudgment: String

    @RequestMapping(value= ["/link/majority-judgment/creation"], method = [GET])
    fun majorityJudgment(): HashMap<String, String> {
        val map = HashMap<String, String>()
        map["link"] = "$majorityJudgment/new/%title%/%attendees%/%choices%"
        return map
    }
}
