import React from "react";
import { Form } from "../common/forms";
import Joi from "joi-browser";
import cardServices from "../common/services/cardsServices";
import { toast } from "react-toastify";

/***
 * "editCardImg" component
 * this component is jest to upload new card images
 */
class EditCardImg extends Form {
  /***
   * the state of the component
   */
  state = {
    formData: {
      bizImage: [],
      bizImageDefault: [],
      bizImageWeek: [],
    },
    errors: {},
    rode: false,
  };

  /**
   * the schema is a object that is parameters getting validate function
   */
  schema = {
    bizImage: Joi.array(),
    bizImageDefault: Joi.array(),
    bizImageWeek: Joi.array(),
  };

  /**
   * the function that "handelSubmit" run if no errors
   * the function will run the "updateCardImage" function from the "cardServices" end catch the errors
   */
  doSubmit = async () => {
    const { formData, rode } = this.state;
    if (rode) {
      const res = await cardServices.updateCardImage(
        this.props.match.params.id,
        formData
      );
      if (res._id === this.props.match.params.id) {
        toast.success("הכרטיס עודכן");
        window.location = "/";
      } else {
        toast.error("הכרטיס לא עודכן");
      }
    } else {
      toast.dark("אין תמונות לעלאה ");
    }
  };

  /**
   * the render jsx of the component
   */
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            <h3> העלאת תמונות חדשות כללים </h3>
            <p>
              1: ישנם שלושה סוגי אפשרויות לעלאה של תמונה חדשה <br />
              1.1: תמונה של הלוגו של החנות או תמונה של החנות <br />
              2.1: תמונה של מבצעי השבוע <br />
              3.1: תמונות אחרות שקשורות לעסק <br /> <br />
              2: אחרי בחירת תמונה התמונה עולה ישר וכשמסתיימת העלאה של התמונה
              מתקבלת הודעה שהתמונה עלתה <br />
              3: <b>חובה </b> אחרי שהתמונה עלתה ללחוץ על כפתור של <br />{" "}
              <i> העלה תמונה חדשה</i>
            </p>
          </div>
          <form onSubmit={this.handelSubmit} className="col-12 mt-5 ">
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-6 col-lg-4">
                {this.renderInputFile(
                  "bizImage",
                  "העלאת תמונות חדשות ",
                  "file"
                )}
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                {this.renderInputFile(
                  "bizImageDefault",
                  "העלאת תמונה קבועה חדשה ",
                  "file"
                )}
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                {this.renderInputFile(
                  "bizImageWeek",
                  "העלאת תמונה שבועית חדשה ",
                  "file"
                )}
              </div>
              <div className="col-12 col-md-6 col-lg-4 mt-3 ">
                {this.renderButtonImg("העלה תמונות חדשות ")}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditCardImg;
