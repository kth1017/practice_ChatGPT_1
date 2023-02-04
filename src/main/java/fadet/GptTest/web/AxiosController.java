package fadet.GptTest.web;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AxiosController {
    @GetMapping("/api/hello")
    public String test() {
        return "Hello, world!";
    }
}
