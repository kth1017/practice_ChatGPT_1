package fadet.GptTest.web;


import fadet.GptTest.ApiService;
import fadet.GptTest.GptService;
import fadet.GptTest.PapagoService;
import fadet.GptTest.TestDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AxiosController {

    private final ApiService apiService;
    private final PapagoService pService;
    private final GptService gptService;

    @GetMapping("/api/hello")
    public String test() {
        return " / 번역 / " + pService.getTranText(pService.incoding(apiService.putQ())) + " / 답변 / " + gptService.incoding(apiService.putA());
    }

    @PostMapping("/request")
    public void save(@RequestBody TestDto testDto) {


        apiService.save(testDto);
        System.out.println("OriginQ = "+ testDto.getOriginQ());
        System.out.println("OriginA = "+ testDto.getOriginA());

    }

    @GetMapping("/apiTest")
    public String[] test2() {
        return apiService.putKey();
    }
}
