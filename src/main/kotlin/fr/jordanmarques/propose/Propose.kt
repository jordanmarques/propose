package fr.jordanmarques.propose

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping



@SpringBootApplication
@RestController
class Propose

fun main(args: Array<String>) {
    runApplication<Propose>(*args)
}

@RequestMapping(value = ["/**/{[path:[^\\.]*}"])
fun redirect(): String {
    // Forward to home page so that route is preserved.
    return "forward:/"
}
