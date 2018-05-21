package ba.qf.travelguide.greeting;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class Controllers {

    private String dest;
    private Model model;

    @GetMapping("/index")
    public String index(@RequestParam(name="dest", required=false, defaultValue="Travel Guide") String dest, Model model) {
        model.addAttribute("dest", dest);
        return "index";
    }
    @GetMapping("/accomodation")
    public String accomodation(@RequestParam(name="dest", required=false, defaultValue="Travel Guide") String dest, Model model) {
        model.addAttribute("dest", dest);
        return "accomodation";
    }
    @GetMapping("/placeToEat")
    public String placeToEat(@RequestParam(name="dest", required=false, defaultValue="Travel Guide") String dest, Model model) {
        model.addAttribute("dest", dest);
        return "placeToEat";
    }
    @GetMapping("/landMarks")
    public String landMarks(@RequestParam(name="dest", required=false, defaultValue="Travel Guide") String dest, Model model) {
        model.addAttribute("dest", dest);
        return "landMarks";
    }

    @GetMapping("/weather")
    public String weather(@RequestParam(name="dest", required=false, defaultValue="Travel Guide") String dest, Model model) {
        model.addAttribute("dest", dest);
        return "weather";
    }
    @GetMapping("/about")
    public String about(@RequestParam(name="dest", required=false, defaultValue="Travel Guide") String dest, Model model) {
        model.addAttribute("dest", dest);
        return "about";
    }

    @GetMapping("/search")
    public String search()
    {
        return "search";
    }



}
