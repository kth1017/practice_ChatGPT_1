package fadet.GptTest.web;


import fadet.GptTest.ApiService;
import fadet.GptTest.GptService;
import fadet.GptTest.PapagoService;
import fadet.GptTest.TestDto;
import lombok.RequiredArgsConstructor;
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
        return "입력 데이터 = " + apiService.list() + " 번역 = " + pService.incoding("안녕하세요") + " 답변 = " + gptService.incoding("Capital of Korea?"); 
    }

    @PostMapping("/request")
    public void save(@RequestBody TestDto testDto) {

        apiService.save(testDto);
        System.out.println("title = "+ testDto.getTitle());
        System.out.println("content = "+ testDto.getContent());

    }
}
