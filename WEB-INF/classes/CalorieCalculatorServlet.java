import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/calculate")
public class CalorieCalculatorServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String exercise = request.getParameter("exercise");
        String durationStr = request.getParameter("duration");
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        try {
            int duration = Integer.parseInt(durationStr);
            int caloriesPerMinute = 0;
            
            if ("running".equals(exercise)) {
                caloriesPerMinute = 10;
            } else if ("cycling".equals(exercise)) {
                caloriesPerMinute = 8;
            } else if ("swimming".equals(exercise)) {
                caloriesPerMinute = 11;
            } else if ("walking".equals(exercise)) {
                caloriesPerMinute = 4;
            }
            
            int totalCalories = duration * caloriesPerMinute;
            
            out.println("<html><head><title>Result</title></head><body style=\"font-family: sans-serif; margin: 40px;\">");
            out.println("<h2>Calculation Result</h2>");
            out.println("<p>Exercise Type: <strong>" + exercise.substring(0, 1).toUpperCase() + exercise.substring(1) + "</strong></p>");
            out.println("<p>Duration: <strong>" + duration + " minutes</strong></p>");
            out.println("<p>Total Calories Burned: <strong style=\"color: #d9534f; font-size: 1.2em;\">" + totalCalories + " kcal</strong></p>");
            out.println("<br><a href=\"index.html\">Calculate Again</a>");
            out.println("</body></html>");
	    out.println("<br><br><br><footer><center><b> All Rights Reserved 25075A0517 </b></center></footer>");
            
        } catch (NumberFormatException e) {
            out.println("<html><body style=\"font-family: sans-serif; margin: 40px;\">");
            out.println("<h2 style=\"color: red;\">Error</h2>");
            out.println("<p>Please enter a valid number for duration.</p>");
            out.println("<a href=\"index.html\">Go Back</a>");
            out.println("</body></html>");
        }
    }
}
