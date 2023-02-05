package fadet.GptTest.web;


import fadet.GptTest.ApiService;
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

    @GetMapping("/api/hello")
    public String test() {
        return apiService.list();
    }

    @PostMapping("/request")
    public void save(@RequestBody TestDto testDto) {

        apiService.save(testDto);
        System.out.println(testDto);
    }
}
