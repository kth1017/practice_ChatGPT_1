package fadet.GptTest.web;

import fadet.GptTest.GptService;
import fadet.GptTest.PapagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.awt.*;
import java.net.http.HttpResponse;

@org.springframework.stereotype.Controller
@RequiredArgsConstructor
public class Controller {

    private final PapagoService pService;
    private final GptService gptService;

    @GetMapping
    public String home(Model model) {

        String s = pService.getTransSentence("안녕하세요");
        String a = gptService.getTransSentence("Capital of Korea?");
        model.addAttribute("a", a);
        model.addAttribute("s", s);
        return "home";
    }

}

