package fadet.GptTest;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.*;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class GptService {

    private final ApiKey apiKey;

    public String incoding(String s) {

        String clientId = apiKey.getGptSecret();//애플리케이션 클라이언트 아이디값";

        String apiURL = "https://api.openai.com/v1/completions";
        String text = "{\"model\": \"text-davinci-003\", \"prompt\": \""+s+"\", \"temperature\": 0.1, \"max_tokens\":1280}";

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("Content-Type", "application/json");
        requestHeaders.put("Authorization", clientId);

        String responseBody = post(apiURL, requestHeaders, text);

        return responseBody;
    }

    private String post(String apiUrl, Map<String, String> requestHeaders, String text) {
        HttpURLConnection con = connect(apiUrl);
        String postParams = text;
        try {
            con.setRequestMethod("POST");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(postParams.getBytes());
                wr.flush();
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
                return readBody(con.getInputStream());
            } else {  // 에러 응답
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private String readBody(InputStream body){
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
}
