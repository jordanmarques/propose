package fr.jordanmarques.propose.controller

import fr.jordanmarques.propose.dto.ProposalChoiceDeleteDto
import fr.jordanmarques.propose.model.Choice
import fr.jordanmarques.propose.model.Proposal
import fr.jordanmarques.propose.service.ProposalService
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMethod.POST
import org.springframework.web.bind.annotation.RequestMethod.GET
import org.springframework.web.bind.annotation.RequestMethod.DELETE


@RestController
@RequestMapping("/api")
class ProposalController(
        private val proposalService: ProposalService
) {

    @RequestMapping(value= ["/proposal"], method = [POST])
    fun new(@RequestBody proposal: Proposal): Proposal {
         return proposalService.save(proposal)
    }

    @RequestMapping(value= ["/proposal/{proposalId}/choices"], method = [POST])
    fun addChoiceToProposal(@RequestBody choice: Choice, @PathVariable("proposalId") proposalId: String): Proposal {
        return proposalService.addChoice(proposalId, choice)
    }

    @RequestMapping(value= ["/proposal/{proposalId}/choices/{choiceId}"], method = [DELETE])
    fun deleteChoice(@PathVariable("choiceId") choiceId: String, @PathVariable("proposalId") proposalId: String): Proposal {
        return proposalService.deleteChoice(proposalId, choiceId)
    }

    @RequestMapping(value= ["/proposal/{proposalId}"], method = [GET])
    fun proposal(@PathVariable("proposalId") proposalId: String): Proposal {
        return proposalService.byId(proposalId)
    }
}
