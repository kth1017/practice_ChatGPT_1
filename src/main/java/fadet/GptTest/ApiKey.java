package fadet.GptTest;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class ApiKey {
        @Value("${PAPAGO_API_ID}")
        private String apiId;
        @Value("${PAPAGO_API_SECRET}")
        private String apiSecret;
        @Value("${GPT_API}")
        private String gptSecret;

}
