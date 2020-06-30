using Microsoft.AspNetCore.SignalR;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChat
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(long username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }

        public Task<IEnumerable<DataSample>> GetMessages()
        {
            var actual = new DataSample[] { new DataSample { Id = 1, Message = "Hello", Username = "Rik" }, new DataSample { Id = 2, Message = "Hi", Username = "Fadi" } };
            return Task.FromResult<IEnumerable<DataSample>>(actual);
        }
    }

    public class DataSample
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string Username { get; set; }

    }
}
