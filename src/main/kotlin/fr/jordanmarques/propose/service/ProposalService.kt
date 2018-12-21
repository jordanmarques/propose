package fr.jordanmarques.propose.service

import fr.jordanmarques.propose.dao.ProposalDao
import fr.jordanmarques.propose.model.Choice
import fr.jordanmarques.propose.model.Proposal
import org.springframework.stereotype.Service

@Service
class ProposalService(
        private val proposalDao: ProposalDao
){
    fun save(proposal: Proposal): Proposal{

        if(proposal.name.isBlank())
            throw RuntimeException("Cannot save a proposal with a blank name.")

        proposalDao.upsert(proposal)
        return proposal
    }

    fun byId( id: String): Proposal{

        if(id.isBlank())
            throw RuntimeException("Empty ID.")

        proposalDao.byId(id)
                ?.let { proposal -> return proposal }
                ?: run { throw RuntimeException("Unable to find a proposal with id $id") }
    }

    fun addChoice(proposalId: String, choice: Choice): Proposal {
        proposalDao.byId(proposalId)
                ?.let { proposal ->

                    proposal.choices.add(choice)
                    proposalDao.upsert(proposal)

                    return proposal
                }
                ?: run { throw RuntimeException("Unable to find a proposal with id $proposalId") }
    }

    fun deleteChoice(proposalId: String, id: String): Proposal {
        proposalDao.byId(proposalId)
                ?.let { proposal ->

                    proposal.choices = proposal.choices
                            .filter { it.id != id }
                            .toMutableList()

                    proposalDao.upsert(proposal)

                    return proposal
                }
                ?: run { throw RuntimeException("Unable to find a proposal with id $proposalId") }
    }
}
