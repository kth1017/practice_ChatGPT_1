package fadet.GptTest;

import org.springframework.stereotype.Service;


@Service
public class ApiService {

    String originQ = "";
    String originA = "";
    String[] keywords = {"java", "js", "react", "spring", "DOM", "spring modules", "python",
    "RDBMS"} ;

    public void save(TestDto testDto) {
        originQ = testDto.getOriginQ();
        originA = testDto.getOriginA();
    }

    public String putQ() {
        return originQ;
    }
    public String putA() {
        return originA;
    }

    public String[] putKey() {
        return keywords;
    }
}
