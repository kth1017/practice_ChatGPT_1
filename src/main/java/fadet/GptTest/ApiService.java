package fadet.GptTest;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

@Service
public class ApiService {

    String set = "";

    public void save(TestDto testDto) {
        set = testDto.getTitle() + " " + testDto.getContent() ;
    }


    public String list() {
        return set;
    }
}
