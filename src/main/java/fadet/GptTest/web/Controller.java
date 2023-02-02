package fadet.GptTest.web;

import fadet.GptTest.PapagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
@RequiredArgsConstructor
public class Controller {

    private final PapagoService pService;

    @GetMapping
    public String home(Model model) {

        String s = pService.getTransSentence("반갑습니다");
        model.addAttribute("s", s);
        return "home";
    }

}

