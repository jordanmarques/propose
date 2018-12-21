package fr.jordanmarques.propose.model

import java.util.*

data class Choice(
        var id: String = UUID.randomUUID().toString(),
        var name: String = "",
        var owner: String = "",
        var metadata: String = ""
)
