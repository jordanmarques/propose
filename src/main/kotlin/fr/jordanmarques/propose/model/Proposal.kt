package fr.jordanmarques.propose.model

import java.util.*

data class Proposal(
        var id: String = UUID.randomUUID().toString(),
        var name: String = "",
        var choices: MutableList<Choice> = mutableListOf()
)
