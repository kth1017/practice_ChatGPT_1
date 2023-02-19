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
    private final GptService gService;

    @GetMapping("/api/transQ")
    public String transQ() {
        String a = " ";
        a = pService.incoding(apiService.putQ());
        System.out.println(a);
        return a;
    }
    
    @GetMapping("/api/sendQ")
    public String sendQ() {
        return gService.incoding(apiService.putQ());
    }

    

    @PostMapping("/request")
    public void save(@RequestBody TestDto testDto) {


        apiService.save(testDto);
        System.out.println("OriginQ = "+ testDto.getOriginQ());

    }

    @GetMapping("/apiTest")
    public String[] test2() {
        return apiService.putKey();
    }
}
