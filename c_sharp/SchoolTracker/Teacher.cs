using static Util.Console;

namespace SchoolMembers
{
    class Teacher : Person, IPayee
    {
        public string Subject;
        public void Pay()
        {
            Log("Paying Teacher... ");
        }
    }
}