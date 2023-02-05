package fadet.GptTest.web;

import fadet.GptTest.ApiService;
import fadet.GptTest.GptService;
import fadet.GptTest.PapagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@org.springframework.stereotype.Controller
@RequiredArgsConstructor
public class Controller {

    private final PapagoService pService;
    private final GptService gptService;
    private final ApiService apiService;

    @GetMapping("/service")
    public String home(Model model) {

        String pBody = pService.incoding("");
        String gBody = gptService.incoding("Capital of Korea?");
        model.addAttribute("pBody", pBody);
        model.addAttribute("gBody", gBody);
        return "home";
    }

}

